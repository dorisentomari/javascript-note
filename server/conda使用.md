# conda 的常用命令

```python
# 查看当前环境列表
conda env list


# 更新 conda
conda update conda

# 创建虚拟环境 
conda create -n env_name python=x.x

# Windows 激活虚拟环境
active env_name

# Windows 退出虚拟环境
deactivate env_name

# MacOS 激活虚拟环境
source active env_name

# MacOS 退出虚拟环境
source deactivate

# 在虚拟环境中安装额外的包
conda install -n env_name package_name

# 删除虚拟环境
conda remove -n env_name --all

# 删除虚拟环境中的某个包
conda remove -n env_name package_name

# 查看现在有的镜像
conda config --show channels

# 添加清华大学镜像
conda config --add channels https://mirrors.tuna.tsinghua.edu.cn/anaconda/pkgs/free/

# 删除清华大学镜像
conda config --remove https://mirrors.tuna.tsinghua.edu.cn/anaconda/pkgs/free/
```
