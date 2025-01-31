from storages.backends.s3boto3 import S3Boto3Storage

class MediaFiles(S3Boto3Storage):
    bucket_name = 'bfu-lms'
    file_overwrite = False
    
    