# Django 使用

## 安装依赖

```shell
# 安装 django
pip install django

# 安装 pytz，处理时区的问题
pip install pytz

# 安装 sqlparse，解析 SQL 语言的库
pip install sqlparse
```

## 开启项目

```shell
# 创建项目
django-admin startproject project_name

# 进入项目
cd project_name

# 创建应用
python manage.py startapp app_name

# 启动服务
python manage.py runserver
```

## 创建和使用数据库

```mysql
# 创建数据库
create database python_tools;

# 使用数据库
use python_tools;
```

## 迁移数据表

```shell
# 创建迁移文件
python manage.py makemigrations

# 迁移数据表
python manage.py migrate
```

## 创建超级用户

```shell
python manage.py createsuperuser

# username: mario
# password: mario
# email: mario@mario.com
```
