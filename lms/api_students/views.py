import json
from rest_framework import status
from django.db import transaction
from django.db.models import Q
from rest_framework.decorators import api_view
from rest_framework.response import Response


from common_bll.decorators import only_admin
from api_users.models import (
    Users,
    UsersPassport,
    )

from api_students.models import (
    StudentForeignDocuments,
    StudentRussianDocuments,
    StudentEducationDocument
)

from api_directions.models import (
    Directions,
    DirectionsStudentsThrough
    )

@api_view(http_method_names=['POST'])
@only_admin
def enrollment_student(request): 
    '''Зачисление студента''' 

    error_list = []
    data = json.loads(request.POST.get('info'))
    try:
        user = Users.objects.get(Q(number=data["common"]["number"]) | Q(email=data["common"]["email"]))
        error_list.append({'user': 'Пользователь с такими данными уже существует.'})
    except Exception:
        pass

    try:
        passport = user.userspassport.get(number=data["documents"]["passport"]["number"])
        error_list.append({'passport': 'Пользователь с такими паспортными данными уже существует.'})
    except Exception:
        pass

    try:
        education_document = user.studenteducationdocument.get(number=data["documents"]["education_document"]["number"])
        error_list.append({'education_document': 'Пользователь с такими данными об образовании уже существует.'})
    except Exception:
        pass

    if data["documents"]["type_citizenship"] == 'russian':
        try:
            russian_document = user.studentrussiandocuments.get(
                Q(snils=data["documents"]["ancillary_document"]["russian"]["snils"]) |
                Q(inn=data["documents"]["ancillary_document"]["russian"]["INN"])
            )
            error_list.append({'russian_document': 'Пользователь с такими данными, как в: Снилс или ИНН, уже существует.'})
        except Exception:
            pass

    if data["documents"]["type_citizenship"] == 'foreign':
        try:
            foreign_document = user.studentforeigndocuments.get(
                Q(fp_number=data["documents"]["ancillary_document"]["foreign"]["foreign_passport"]["number"]) |
                Q(mc_number=data["documents"]["ancillary_document"]["foreign"]["migration_card"]["number"])
            )
            error_list.append({'foreign_document': 'Пользователь с такими данными, как в: загран паспорт или миграционная карта уже существует.'})
        except Exception:
            pass

    if len(error_list) != 0:
        response = Response(
            {
                'status': 'error',
                'comment': 'such user has already been created',
            },
            status=400
        )
        return response
    else:
        with transaction.atomic():
            
            user_obj = Users(
                email=data["common"]["email"],
                number=data["common"]["number"],
                surname=data["common"]["surname"],
                name=data["common"]["name"],
                otchestvo=data["common"]["otchestvo"],
                role='student',
                avatar=request.data.get('account_photo')
            )
            user_obj.set_password(data["common"]["password"])
            user_obj.save()

            try:
                direction = Directions.objects.get(id=data['direction']['id'])
                direction.students.add(user_obj)
            except Exception: 
                return Response({'status': 'error', 'comment': 'such a direction doesn\'t exist'},
                status=400)

            user_passport_obj = UsersPassport.objects.create(
                user=user_obj,
                gender=data["common"]["gender"],
                date_of_birth=data["common"]["datebirth"],
                citizenship=data["documents"]["passport"]["citizenship"],
                issued_by=data["documents"]["passport"]["issued_by"],
                date_issuance=data["documents"]["passport"]["date_issuance"],
                code_subdepartment=data["documents"]["passport"]["code_subdepartment"],
                serial=data["documents"]["passport"]["serial"],
                number=data["documents"]["passport"]["number"]
            )

            user_education_documents = StudentEducationDocument.objects.create(
                user=user_obj,
                number=data["documents"]["education_document"]["number"],
                date_issuance=data["documents"]["education_document"]["date_issuance"],
                issued_by=data["documents"]["education_document"]["issued_by"]
            )

            if data["documents"]["type_citizenship"] == 'russian':
                ancillary_document = StudentRussianDocuments(
                    user=user_obj,
                    snils=data["documents"]["ancillary_document"]["russian"]["snils"],
                    inn=data["documents"]["ancillary_document"]["russian"]["INN"]
                )
            else:
                ancillary_document = StudentForeignDocuments.objects.create(
                    user=user_obj,
                    fp_number=data["documents"]["ancillary_document"]["foreign"]["foreign_passport"]["number"],
                    fp_date_issuance=data["documents"]["ancillary_document"]["foreign"]["foreign_passport"]["date_issuance"],
                    fp_expire_date=data["documents"]["ancillary_document"]["foreign"]["foreign_passport"]["date_expire"],
                    fp_issued_by=data["documents"]["ancillary_document"]["foreign"]["foreign_passport"]["issued_by"],
                    
                    mc_number=data["documents"]["ancillary_document"]["foreign"]["migration_card"]["number"],
                    mc_date_entry=data["documents"]["ancillary_document"]["foreign"]["migration_card"]["date_entry"]
                )
            
            return Response({'status': 'ok', 'comment': 'student has been created successfully'}) 