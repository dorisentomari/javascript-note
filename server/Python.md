# Python 常用命令

## 临时换源

```shell
#清华源
pip install markdown -i https://pypi.tuna.tsinghua.edu.cn/simple

# 阿里源
pip install markdown -i https://mirrors.aliyun.com/pypi/simple/

# 腾讯源
pip install markdown -i http://mirrors.cloud.tencent.com/pypi/simple

# 豆瓣源
pip install markdown -i http://pypi.douban.com/simple/
```

## 永久换源
```shell
# 清华源
pip config set global.index-url https://pypi.tuna.tsinghua.edu.cn/simple

# 阿里源
pip config set global.index-url https://mirrors.aliyun.com/pypi/simple/

# 腾讯源
pip config set global.index-url http://mirrors.cloud.tencent.com/pypi/simple

# 豆瓣源
pip config set global.index-url http://pypi.douban.com/simple/
```

## 创建虚拟环境

```shell
# 安装 virtualenv
pip install virtualenv

# 使用 virtualenv 创建虚拟环境
virtualenv env_name

# Windows 进入虚拟环境
cd Scripts
activate.bat

# Windows 退出虚拟环境
cd Scripts
deactivate.bat

# MacOS Linux 进入虚拟环境
source env_name/bin/activate
```

## 重新安装 pip

- [pip 官方文档](https://pip.pypa.io/en/stable/installation/)

```shell
# 下载 get-pip.py
curl https://bootstrap.pypa.io/get-pip.py -o get-pip.py
```

## requirements.txt

```shell
# Python3 生成 requirements.txt
pip3 freeze > requirements.txt  

# Python2 生成 requirements.txt
pip freeze > requirements.txt

# 通过 requirements.txt 安装依赖
pip install -r requirements.txt
```
