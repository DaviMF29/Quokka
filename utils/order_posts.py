from datetime import datetime

def order_posts_by_createdAt(posts_list):
    for posts in posts_list:
        sorted_posts = sorted(posts, key=lambda x: datetime.strptime(x['createdAt'], '%H:%M:%S:%d/%m/%Y'))
        for post in sorted_posts:
            print(post['createdAt'])