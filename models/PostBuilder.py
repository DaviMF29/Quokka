class PostBuilder:
    def __init__(self):
        self.post = {
            "userId": "",
            "username": "",
            "text": "",
            "createdAt": "",
            "likes": 0,
            "comments": [],
            "isCode": False,
            "language": "",
            "previousPostId": ""
        }

    @staticmethod
    def anPost(userId, username, text, createdAt):
        builder = PostBuilder()

        builder.post['userId'] = userId
        builder.post['username'] = username
        builder.post['text'] = text
        builder.post['createdAt'] = createdAt
        return builder

    def now(self):
        return self.post
