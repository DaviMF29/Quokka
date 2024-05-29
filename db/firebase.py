import firebase_admin
from firebase_admin import credentials, storage

cred = credentials.Certificate('db/quokka-credentials.json')
firebase_admin.initialize_app(cred, {
    'storageBucket': 'quokka-3fca5.appspot.com'
})

def upload_image_to_firebase(image_path, destination_blob_name):
    try:
        bucket = storage.bucket()
        blob = bucket.blob(destination_blob_name)
        blob.upload_from_filename(image_path)
        blob.make_public()
        return blob.public_url
    except Exception as e:
        raise Exception(f"Erro ao fazer upload da imagem para o Firebase: {str(e)}")
