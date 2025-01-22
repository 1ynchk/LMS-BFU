
import { FaNewspaper } from "react-icons/fa";
import { GrSchedule } from "react-icons/gr";
import { TbAbacus } from "react-icons/tb";
import { TbSchoolBell } from "react-icons/tb";
import { LiaUsersCogSolid } from "react-icons/lia";

export const sections = [
        {
            'title': 'Новости',
            'link': '/admin/news/',
            'icon': <FaNewspaper/>,
            'lst': [
                {
                    'title': 'Добавить новость',
                    'link': '/admin/news/add/'
                },
                {
                    'title': 'Все новости',
                    'link': '/admin/news/'
                },
                {
                    'title': 'Архив',
                    'link': '/admin/news/archive/'
                }
            ],
            'link_all': '/admin/news/'    
        },
        {
            'title': 'Расписание',
            'link': '/admin/news/',
            'icon': <GrSchedule/>,
            'lst': [
                {
                    'title': 'Изменить расписание',
                    'link': '/admin/schedule/change/'
                },
                {
                    'title': 'Расписание персонала',
                    'link': '/admin/schedule/staff/'
                },
                {
                    'title': 'Расписание обучающихся',
                    'link': '/admin/schedule/students/'
                },
            ],
            'link_all': '/admin/schedule/'    
        },
        {
            'title': 'Курсы',
            'link': '/admin/courses/',
            'icon': <TbAbacus/>,
            'lst': [
                {
                    'title': 'Все курсы',
                    'link': '/admin/courses/all/'
                },
                {
                    'title': 'Добавить курс',
                    'link': '/admin/courses/add/'
                },
                {
                    'title': 'Курсы персонала',
                    'link': '/admin/courses/staff/'
                }
            ],
            'link_all': '/admin/courses/'
        },
        {
            'title': 'Абитуриенты',
            'link': '/admin/applicants/',
            'icon': <TbSchoolBell/>,
            'lst': [
                {
                    'title': 'Заявки',
                    'link': '/admin/applicants/proposals/'
                },
                {
                    'title': 'Направления',
                    'link': '/admin/applicants/directions/'
                },
                {
                    'title': 'Консультации',
                    'link': '/admin/applicants/consultations/'
                }
            ],
            'link_all': '/admin/applicants/'
        },
        {
            'title': 'Персонал',
            'link': '/admin/staff/',
            'icon': <LiaUsersCogSolid/>,
            'lst': [
                {
                    'title': 'Весь персонал',
                    'link': '/admin/staff/all'
                },
                {
                    'title': 'Расписание персонала',
                    'link': '/admin/schedule/staff/'
                },
                {
                    'title': 'Аналитика и отчеты',
                    'link': '/admin/staff/reports/'
                }
            ],
            'link_all': '/admin/staff/' 
        },
    ]