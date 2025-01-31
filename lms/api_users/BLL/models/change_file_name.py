import os 

def change_file_name(instance, filename):
    ext = filename.split('.')[-1]
    filename = f'{instance.surname}-{instance.name}-av.{ext}'
    return os.path.join('media/users/avatars/', filename) 