---
title: 基于 WSL 2 和 VS Code 的 Python、C/C++ 开发环境配置最佳实践
published: 2025-07-04

description: 本文简要介绍了笔者本人使用 VS Code 基于 WSL 2 的 Python 和 C/C++ 基本开发环境的配置操作。
tags:
  - WSL
  - VS Code
  - Python
  - C/C++

draft: false
pin: 0
toc: true
lang: zh
abbrlink: wsl2-vscode-python-cpp-dev-best-practices
---

> [!NOTE]
> 本文笔者使用的设备环境是 Windows 11 家庭中文版 24H2，且配置的是基于 WSL 2 的 Ubuntu 24.04 LTS 发行版，不代表以下教程适用于其他情况。

## 启用 WSL 2 并安装 Linux 发行版

如果你的 Windows 11 完全没有安装或启用过 WSL，只要以**管理员身份**运行 PowerShell 或 CMD（Windows Command Prompt，Windows 命令提示符），输入命令 `wsl --install`，然后重新启动电脑，即可一键完成 WSL 的启用和安装。最终，这条命令会为你启用 WSL，下载并安装最新的 WSL Linux 内核（默认是 WSL 2，可以通过 `wsl --set-default-version 2` 修改，但你八成不太会用上这个命令），并同时为你下载、安装一个名为 `Ubuntu` 的默认发行版（一般是最新的 Ubuntu LTS 版本）。你唯一需要做的就是根据提示创建一个 Unix 用户并配置好密码。

例如：

```powershell
Windows PowerShell
版权所有（C） Microsoft Corporation。保留所有权利。

安装最新的 PowerShell，了解新功能和改进！https://aka.ms/PSWindows

PS C:\WINDOWS\system32> wsl --install
正在下载: Ubuntu
正在安装: Ubuntu
已成功安装分发。可以通过 “wsl.exe -d Ubuntu” 启动它
正在启动 Ubuntu...
wsl: 检测到 localhost 代理配置，但未镜像到 WSL。NAT 模式下的 WSL 不支持 localhost 代理。
Provisioning the new WSL instance Ubuntu
This might take a while...
Create a default Unix user account: david
New password:
Retype new password:
passwd: password updated successfully
To run a command as administrator (user "root"), use "sudo <command>".
See "man sudo_root" for details.

david@ThinkBook:/mnt/c/WINDOWS/system32$ exit
exit
PS C:\WINDOWS\system32> wsl -l -v
  NAME              STATE           VERSION
* Ubuntu            Stopped         2
```

当然，你也可以手动一步步执行这条命令为你完成的操作：打开设置，转到**应用**->**应用和功能**->**可选功能**，再点击**更多Windows功能**，找到**适用于Linux的Windows子系统**（Windows Subsystem for Linux）和**虚拟机平台**（Virtual Machine Platform），勾选这两项后点击“确定”，然后重启电脑。

接下来你可以通过 `wsl -l -o` (`wsl --list --online`) 查看所有可用的发行版和版本列表，然后使用 `wsl --install -d <Name>` 安装指定的发行版（新版本的 WSL 工具链已经简化了此命令，你可以去掉 `-d` 直接通过 `wsl --install <Name>` 安装指定发行版），例如 `wsl --install -d Ubuntu-24.04`。

```powershell
PS C:\WINDOWS\system32> wsl --list --online
以下是可安装的有效分发的列表。
使用“wsl.exe --install <Distro>”安装。

NAME                            FRIENDLY NAME
AlmaLinux-8                     AlmaLinux OS 8
AlmaLinux-9                     AlmaLinux OS 9
AlmaLinux-Kitten-10             AlmaLinux OS Kitten 10
AlmaLinux-10                    AlmaLinux OS 10
Debian                          Debian GNU/Linux
FedoraLinux-42                  Fedora Linux 42
SUSE-Linux-Enterprise-15-SP6    SUSE Linux Enterprise 15 SP6
SUSE-Linux-Enterprise-15-SP7    SUSE Linux Enterprise 15 SP7
Ubuntu                          Ubuntu
Ubuntu-24.04                    Ubuntu 24.04 LTS
archlinux                       Arch Linux
kali-linux                      Kali Linux Rolling
openSUSE-Tumbleweed             openSUSE Tumbleweed
openSUSE-Leap-15.6              openSUSE Leap 15.6
Ubuntu-18.04                    Ubuntu 18.04 LTS
Ubuntu-20.04                    Ubuntu 20.04 LTS
Ubuntu-22.04                    Ubuntu 22.04 LTS
OracleLinux_7_9                 Oracle Linux 7.9
OracleLinux_8_7                 Oracle Linux 8.7
OracleLinux_9_1                 Oracle Linux 9.1
```

## 管理已安装的 WSL 发行版系统

你可以通过 `wsl -l -v` (`wsl --list --verbose`) 查看所有已安装的 WSL 发行版及其运行状态，并使用 `wsl -d <Name>` 启动相应 WSL 发行版的终端。

下面介绍一些常用的命令。

### 查看所有已安装的 WSL 发行版运行状态

```powershell
PS C:\WINDOWS\system32> wsl -l -v
  NAME              STATE           VERSION
* Ubuntu-24.04      Running         2
  docker-desktop    Stopped         2
```

其中带有星号 `*` 的项是默认的发行版，我们可以通过 `wsl --set-default <Name>` 修改。如果不使用 `-d` (`--distribution`) 指定发行版，启动的就是默认的发行版。

### 启动

```powershell
PS C:\WINDOWS\system32> wsl ~ -d Ubuntu-24.04
<YourUsername>@<YourMachineName>:~$ 
```

如果你不指定初始目录 `~`，那么你在登录发行版后会在 Windows 终端所在的目录下，例如 `/mnt/c/Users/david`。

### 更新

```powershell
PS C:\WINDOWS\system32> wsl --update
正在检查更新。
已安装最新版本的适用于 Linux 的 Windows 子系统。
```

### 停止或退出发行版

如果只要关闭特定发行版，使用 `wsl --terminate <Name>` 即可；如果需要在发行版内部关闭，可以使用 `logout`、`exit` 或 `Ctrl + D`。如果需要关闭所有 WSL 实例，可以使用 `wsl --shutdown`。﻿

## 一些其他杂项设置

### 将发行版迁移到系统盘之外的盘

`wsl --install` 命令本身没有提供直接指定安装路径的选项，它会默认将发行版安装在 C 盘的用户个人文件夹下，如果你的 C 盘剩余空间和我一样已经捉襟见肘，不如选择将安装好的 WSL 发行版迁移到其他盘。下面以将默认在 C 盘安装的 `Ubuntu-24.04` 迁移到 D 盘为例进行演示：

1. 在 D 盘创建目标文件夹：`mkdir D:\WSL`、`mkdir D:\WSL\Ubuntu-24.04`。
2. 导出已安装的发行版：`wsl --export Ubuntu-24.04 D:\WSL\ubuntu2404.tar`。
3. 注销（删除）C 盘的旧发行版：`wsl --unregister Ubuntu-24.04`。这个操作会删除 C 盘上的原发行版及其所有数据，请确保上一步的导出已成功完成。
4. 导入发行版到 D 盘：`wsl --import Ubuntu-24.04 D:\WSL\Ubuntu-24.04 D:\WSL\ubuntu2404.tar --version 2`。
5. 导入成功后删除备份文件：`del D:\WSL\ubuntu2404.tar`。

### 配置开源软件镜像站

如果你想要让 WSL 2 发行版得以使用 Clash 等代理软件，可以参考[这篇文章](https://blog.east.monster/2022/10/05/clash-config-in-wsl/)。

此处建议使用服务器架设于中国大陆的镜像站，例如[清华大学开源软件镜像站](https://mirrors.tuna.tsinghua.edu.cn/help/ubuntu/)。

## 通过 VS Code 在 WSL 2 上进行开发

安装、配置 VS Code 的过程在此不赘述，只需要在 VS Code 上安装 WSL 扩展即可。`Ctrl + Alt + O` 或按 `F1`  输入 WSL 后，选择 `New WSL Window using Distro...` 就可以指定要连接的发行版（`New WSL Window` 启动的应该是默认的发行版）。

### 配置 Python 开发环境

1. 在已经连接到 WSL 的 VS Code 窗口中，同时在本地和远程环境（WSL）安装 Python 扩展。
2. 在 WSL 2 Ubuntu 发行版中安装 Miniconda：`wget https://repo.anaconda.com/miniconda/Miniconda3-latest-Linux-x86_64.sh`，随后运行脚本 `bash Miniconda3-latest-Linux-x86_64.sh`，完成后重启终端，即可在提示符前看到 `(base)`。

运行安装脚本时，可能会有提示 `Do you wish the installer to initialize Miniconda3 by running 'conda init'?`，这里建议输入 `yes`，这样脚本会修改 shell 配置文件（通常是 `~/.bashrc`），这样每次启动新的终端时 Conda 的 base 环境就会自动激活。

另外，也可以同时使用 Ubuntu 24.04 官方源的 Python 3.12，确保操作系统和系统级应用的稳定性；在我们自己的开发环境中使用 Miniconda 作为环境管理工具，可以避免与系统工具冲突：

Ubuntu 24.04 默认自带了 Python 3.12。你可以通过以下命令来安装或确认它是否已安装。这个版本通常是经过 Canonical 测试和验证的，能与系统其他组件良好协作。

1. 更新软件包列表：打开终端，运行命令 `sudo apt update` 以确保你的软件包列表是最新版本。
2. 安装 Python 3.12：执行 `sudo apt install python3.12` 来安装 Python 3.12。如果已经安装，系统会提示。
3. 安装完成后，检查 Python 版本：`python3.12 --version`。输出应该会显示 Python 3.12.3。

注意这里的 Python 版本号是 3.12.3，作为 LTS 系统，我们不需要特别在意版本号是否最新，使用 Ubuntu 官方维护的软件包即可。

```bash
ysd1123@YSD-ThinkBook:~$ python3.12 -V
Python 3.12.3
ysd1123@YSD-ThinkBook:~$ conda activate
(base) ysd1123@YSD-ThinkBook:~$ python -V
Python 3.13.5
```

### 配置深度学习开发环境

可以通过 `nvidia-smi` 或 `nvcc` 检查 Nvidia GPU 是否在 WSL 中可用。一般可能需要安装 CUDA Toolkit 才能使用后者（`sudo apt install nvidia-cuda-toolkit`）。

```bash
(base) ysd1123@YSD-ThinkBook:~$ nvidia-smi
Wed Jul  2 23:09:16 2025       
+-----------------------------------------------------------------------------------------+
| NVIDIA-SMI 575.51.02              Driver Version: 576.02         CUDA Version: 12.9     |
|-----------------------------------------+------------------------+----------------------+
| GPU  Name                 Persistence-M | Bus-Id          Disp.A | Volatile Uncorr. ECC |
| Fan  Temp   Perf          Pwr:Usage/Cap |           Memory-Usage | GPU-Util  Compute M. |
|                                         |                        |               MIG M. |
|=========================================+========================+======================|
|   0  NVIDIA GeForce RTX 4060 ...    On  |   00000000:01:00.0  On |                  N/A |
| N/A   34C    P8              2W /  115W |     265MiB /   8188MiB |      0%      Default |
|                                         |                        |                  N/A |
+-----------------------------------------+------------------------+----------------------+
                                                                                         
+-----------------------------------------------------------------------------------------+
| Processes:                                                                              |
|  GPU   GI   CI              PID   Type   Process name                        GPU Memory |
|        ID   ID                                                               Usage      |
|=========================================================================================|
|  No running processes found                                                             |
+-----------------------------------------------------------------------------------------+
(base) ysd1123@YSD-ThinkBook:~$ nvcc --version
nvcc: NVIDIA (R) Cuda compiler driver
Copyright (c) 2005-2023 NVIDIA Corporation
Built on Fri_Jan__6_16:45:21_PST_2023
Cuda compilation tools, release 12.0, V12.0.140
Build cuda_12.0.r12.0/compiler.32267302_0
```

### 配置 C/C++ 开发环境

因笔者暂无除算法题以外的使用 C/C++ 的需求，因此此处不会涉及详细的适用于 C/C++ 大型工程的开发环境配置。

#### 在 Ubuntu 中安装 C/C++ 工具链

首先需要在 WSL 2 的 Ubuntu 中安装核心的开发工具。build-essential 是一个集合包，它包含了 C/C++ 编译器（gcc 和 g++）、make 等自动化编译工具。gdb 是我们用来调试代码的工具。

在 VS Code 集成终端中，输入 `sudo apt update && sudo apt install build-essential gdb -y` 来更新软件包列表，并安装 GNU 编译器工具和 GDB 调试器。

安装完成后，可以验证是否安装成功：

```bash
(base) <YourUsername>@<YourMachineName>:~$ g++ --version
g++ (Ubuntu 13.3.0-6ubuntu2~24.04) 13.3.0
Copyright (C) 2023 Free Software Foundation, Inc.
This is free software; see the source for copying conditions.  There is NO
warranty; not even for MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.

(base) <YourUsername>@<YourMachineName>:~$ gdb --version
GNU gdb (Ubuntu 15.0.50.20240403-0ubuntu1) 15.0.50.20240403-git
Copyright (C) 2024 Free Software Foundation, Inc.
License GPLv3+: GNU GPL version 3 or later <http://gnu.org/licenses/gpl.html>
This is free software: you are free to change and redistribute it.
There is NO WARRANTY, to the extent permitted by law.
```

随后在 VS Code 中安装 C/C++ 扩展即可，注意需要安装到 WSL 环境。

#### 创建工作区并配置编译和调试

在家目录下创建你喜欢的目录，例如 `/projects/acm_practise`。执行 `cd ~/projects/helloworld`，在通过 `code .` 启动 VS Code 在该文件夹下的新窗口。

新建一个 C++ 文件`main.cpp`，粘贴以下代码并保存：

```cpp
#include <iostream>
#include <vector>
#include <string>

using namespace std;

int main()
{
   vector<string> msg {"Hello", "C++", "World", "from", "VS Code", "and the C++ extension!"};

   for (const string& word : msg)
   {
      cout << word << " ";
   }
   cout << endl;
}
```

随后按下 VS Code 界面右上角的播放按钮，选择 `Run C/C++ File`，在弹出的窗口中，在系统上检测到的编译器列表中选择 `g++ 构建并调试活动文件`（`g++ build and debug active file`）。首次运行 C++ 文件时，系统只会提示选择一个编译器（此编译器将在 `tasks.json` 中设置为默认编译器）。

当然，你也可以按下 `Ctrl + Shift + D`，在左侧 `运行和调试` 窗口中创建 `launch.json`：如果你的工作区中已经有 `launch.json` 文件，按下播放按钮后 VS Code 会自动读取它以确定如何运行和调试你的 C++ 代码，否则 VS Code 只会创建一个临时的配置。（详情见此处：[code.visualstudio.com, Using C++ and WSL in VS Code](https://code.visualstudio.com/docs/cpp/config-wsl)）

这里另外推荐 [Code Runner](https://marketplace.visualstudio.com/items?itemName=formulahendry.code-runner) 插件，并在自己的工作区内（不建议全局修改配置，即只在工作区 `.vscode/settings.json` 中修改）使用以下配置：

```json
{
    "code-runner.runInTerminal": true,
    "code-runner.clearPreviousOutput": true,
    "code-runner.fileDirectoryAsCwd": true,
    "code-runner.executorMap": {
        "c": "gcc $fileName -o $fileNameWithoutExt && $dir$fileNameWithoutExt",
        "cpp": "g++ $fileName -o build/$fileNameWithoutExt && $dir/build/$fileNameWithoutExt",
    },
    "code-runner.preserveFocus": false,
    "code-runner.saveFileBeforeRun": true,
}
```

具体设置项释义在此不赘述。

最后，通过 `Ctrl + Alt + N` 快捷键，你就可以快捷地编译运行当前编辑器中打开的代码文件。如果你需要调试代码，只需要使用右上角的播放按钮进行调试。

---

## 参考资料

1. [code.visualstudio.com, Developing in WSL.](https://code.visualstudio.com/docs/remote/wsl)
2. [marketplace.visualstudio.com, Visual Studio Code WSL](https://marketplace.visualstudio.com/items?itemName=ms-vscode-remote.remote-wsl)
3. [code.visualstudio.com, WSL 2 with Visual Studio Code](https://code.visualstudio.com/blogs/2019/09/03/wsl2)
4. [learn.microsoft.com, Basic commands for WSL](https://learn.microsoft.com/en-us/windows/wsl/basic-commands)
5. [code.visualstudio.com, Using C++ and WSL in VS Code](https://code.visualstudio.com/docs/cpp/config-wsl)
6. [prinsss.github.io, 使用 VS Code 搭建适用于 ACM 练习的 C/C++ 开发环境](https://prinsss.github.io/vscode-c-cpp-configuration-for-acm-oj/)