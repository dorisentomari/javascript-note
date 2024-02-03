# MySQL 8.0 常见问题记录

## `ERROR 1045 (28000): Access denied for user 'root'@'localhost' (using password: YES)`
- 答案地址 https://stackoverflow.com/questions/32858216/error-1045-28000-access-denied-for-user-rootlocalhost-using-password-n

```shell
brew services stop mysql
sudo pkill mysqld
sudo rm -rf /usr/local/var/mysql/ # NOTE: this will delete your existing database!!!
brew postinstall mysql
brew services restart mysql
mysql -uroot
```

## 修改密码

```shell
-- 修改密码
ALTER USER 'root'@'localhost' IDENTIFIED WITH mysql_native_password BY 'mi123456';

-- 更新权限
FLUSH PRIVILEGES;
```

# MySQL 命令记录

## 数据库操作

```mysql
-- 创建数据库
CREATE DATABASE d1;

-- 删除数据库
DROP DATABASE d1;

-- 修改数据库名字
RENAME TABLE d1 TO d2;
```

