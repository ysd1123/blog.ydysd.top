---
title: Best Practices for Configuring a Python and C/C++ Development Environment with WSL 2 and VS Code
published: 2025-07-04

description: This article outlines the steps for configuring a basic Python and C/C++ development environment with VS Code and WSL 2.
tags:
  - WSL
  - VS Code
  - Python
  - C&C++

draft: false
pin: 0
toc: true
lang: en
abbrlink: wsl2-vscode-python-cpp-dev-best-practices
---

:::note[Translated by AI]
This article was originally written manually in **Simplified Chinese** and translated into **English** by the GPT-5 model.
:::

> [!NOTE]
> The setup in this post was done on Windows 11 Home 24H2 with an Ubuntu 24.04 LTS distro running under WSL 2. Your mileage may vary with different versions or distros.

## Enable WSL 2 and install a Linux distribution

If you haven't enabled or installed WSL at all, open PowerShell or CMD as Administrator and run `wsl --install`. Then restart your PC. This single command enables WSL, downloads and installs the latest WSL Linux kernel (WSL 2 by default — you can change it with `wsl --set-default-version 2`, though you likely won't need to), and installs the default `Ubuntu` distro (typically the latest Ubuntu LTS). The only thing you'll do manually is create a Unix user and set a password when prompted.

For example:

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

Of course, you can also perform the steps that `wsl --install` automates: open Settings, go to Apps -> Optional features -> More Windows features, check Windows Subsystem for Linux and Virtual Machine Platform, click OK, and reboot.

Next, run `wsl -l -o` (`wsl --list --online`) to see all available distros and versions. Then install a specific distro with `wsl --install -d <Name>` (in newer WSL builds you can omit `-d` and just run `wsl --install <Name>`). For example: `wsl --install -d Ubuntu-24.04`.

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

## Manage installed WSL distros

Use `wsl -l -v` (`wsl --list --verbose`) to view all installed WSL distros and their status. Start a specific distro with `wsl -d <Name>`.

Here are some common commands.

### List all distros and status

```powershell
PS C:\WINDOWS\system32> wsl -l -v
  NAME              STATE           VERSION
* Ubuntu-24.04      Running         2
  docker-desktop    Stopped         2
```

The item with an asterisk `*` is the default distro. You can change it with `wsl --set-default <Name>`. If you don't pass `-d` (`--distribution`), WSL starts the default distro.

### Launch a distro

```powershell
PS C:\WINDOWS\system32> wsl ~ -d Ubuntu-24.04
<YourUsername>@<YourMachineName>:~$
```

If you don't specify the initial directory `~`, you'll land in the Windows terminal's current directory, e.g., `/mnt/c/Users/david`.

### Update WSL

```powershell
PS C:\WINDOWS\system32> wsl --update
正在检查更新。
已安装最新版本的适用于 Linux 的 Windows 子系统。
```

### Stop or exit a distro

To stop a specific distro, use `wsl --terminate <Name>`. From inside the distro, you can exit with `logout`, `exit`, or `Ctrl + D`. To shut down all WSL instances, use `wsl --shutdown`.

## Some other miscellaneous settings

### Move a distro off the system drive

The `wsl --install` command doesn't let you choose an install path; it installs the distro under your profile on drive C. If C: space is tight, you can migrate the distro to another drive. Here's how to move `Ubuntu-24.04` to D: as an example:

1. Create target folders on D:: `mkdir D:\WSL`, `mkdir D:\WSL\Ubuntu-24.04`.
2. Export the installed distro: `wsl --export Ubuntu-24.04 D:\WSL\ubuntu2404.tar`.
3. Unregister (remove) the old distro on C:: `wsl --unregister Ubuntu-24.04`. This deletes the original distro and all its data on C:, so make sure the export in the previous step completed successfully.
4. Import the distro to D:: `wsl --import Ubuntu-24.04 D:\WSL\Ubuntu-24.04 D:\WSL\ubuntu2404.tar --version 2`.
5. After a successful import, delete the backup file: `del D:\WSL\ubuntu2404.tar`.

### Configure open-source mirror sites

If you want to use a proxy like Clash in WSL 2, see [this post](https://blog.east.monster/2022/10/05/clash-config-in-wsl/).

For package sources, it's recommended to use mirror sites hosted in mainland China for better speed (if you're there), for example the [Tsinghua University Open Source Mirror](https://mirrors.tuna.tsinghua.edu.cn/help/ubuntu/).

## Develop on WSL 2 with VS Code

I won't cover installing and configuring VS Code itself here. Just install the WSL extension. Press `Ctrl + Alt + O` or `F1` and type "WSL", then choose `New WSL Window using Distro...` to connect to a specific distro (`New WSL Window` launches the default distro).

### Set up the Python environment

1. In the VS Code window connected to WSL, install the Python extension in both the local and the remote (WSL) environments.
2. Install Miniconda inside your WSL 2 Ubuntu: `wget https://repo.anaconda.com/miniconda/Miniconda3-latest-Linux-x86_64.sh`, then run the script `bash Miniconda3-latest-Linux-x86_64.sh`. After installation, restart the terminal, and you should see `(base)` in your prompt.

During the installer, you'll likely be asked: `Do you wish the installer to initialize Miniconda3 by running 'conda init'?` I recommend `yes`. The script will update your shell rc file (usually `~/.bashrc`) so the Conda base environment activates automatically in new terminals.

You can also keep using the system Python 3.12 from Ubuntu 24.04 for OS/system tools while using Miniconda for your own development to avoid conflicts:

Ubuntu 24.04 ships Python 3.12. You can install or verify it with the commands below. This version is tested by Canonical and works well with other system components.

1. Update the package list: `sudo apt update`.
2. Install Python 3.12: `sudo apt install python3.12`.
3. Verify the version: `python3.12 --version` — you should see Python 3.12.3.

Note the version here is 3.12.3. On an LTS system, you don't need the absolute latest — the Ubuntu-maintained packages are fine.

```bash
ysd1123@YSD-ThinkBook:~$ python3.12 -V
Python 3.12.3
ysd1123@YSD-ThinkBook:~$ conda activate
(base) ysd1123@YSD-ThinkBook:~$ python -V
Python 3.13.5
```

### Set up a deep learning environment

Use `nvidia-smi` or `nvcc` to check whether your NVIDIA GPU is visible inside WSL. You may need the CUDA Toolkit for the latter (`sudo apt install nvidia-cuda-toolkit`).

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

### Set up the C/C++ environment

I mostly use C/C++ for algorithm exercises at the moment, so this section doesn't go into large-scale project setup.

#### Install the C/C++ toolchain on Ubuntu

First, install the core build tools inside your WSL 2 Ubuntu. `build-essential` is a meta package that includes gcc/g++, make, etc. `gdb` is the debugger.

In the VS Code integrated terminal, run `sudo apt update && sudo apt install build-essential gdb -y` to update packages and install the GNU toolchain and GDB.

After installation, verify:

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

Then install the C/C++ extension in VS Code (in the WSL environment).

#### Create a workspace and configure build & debug

Create a directory under your home, e.g., `/projects/acm_practise`. Then `cd ~/projects/helloworld` and run `code .` to open a new VS Code window in that folder.

Create a new C++ file `main.cpp`, paste the following and save:

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

Click the Run button in the top right of VS Code, choose `Run C/C++ File`, then select `g++ build and debug active file` from the detected compilers. The first time you run a C++ file, VS Code will prompt you to select a compiler (it will be saved to `tasks.json`).

Alternatively, press `Ctrl + Shift + D` and create a `launch.json` under Run and Debug. If your workspace already has one, VS Code will use it to run/debug your code when you hit the Run button; otherwise it creates a temporary config. (Details: https://code.visualstudio.com/docs/cpp/config-wsl)

I also recommend the [Code Runner](https://marketplace.visualstudio.com/items?itemName=formulahendry.code-runner) extension. Configure it in your workspace settings (avoid changing global settings) via `.vscode/settings.json` like this:

```json
{
  "code-runner.runInTerminal": true,
  "code-runner.clearPreviousOutput": true,
  "code-runner.fileDirectoryAsCwd": true,
  "code-runner.executorMap": {
    "c": "gcc $fileName -o $fileNameWithoutExt && $dir$fileNameWithoutExt",
    "cpp": "g++ $fileName -o build/$fileNameWithoutExt && $dir/build/$fileNameWithoutExt"
  },
  "code-runner.preserveFocus": false,
  "code-runner.saveFileBeforeRun": true
}
```

I won't expand on what each setting does here.

Finally, with `Ctrl + Alt + N` you can quickly build and run the file open in the editor. If you need to debug, use the Run button in the top right.

---

## References

1. [code.visualstudio.com, Developing in WSL.](https://code.visualstudio.com/docs/remote/wsl)
2. [marketplace.visualstudio.com, Visual Studio Code WSL](https://marketplace.visualstudio.com/items?itemName=ms-vscode-remote.remote-wsl)
3. [code.visualstudio.com, WSL 2 with Visual Studio Code](https://code.visualstudio.com/blogs/2019/09/03/wsl2)
4. [learn.microsoft.com, Basic commands for WSL](https://learn.microsoft.com/en-us/windows/wsl/basic-commands)
5. [code.visualstudio.com, Using C++ and WSL in VS Code](https://code.visualstudio.com/docs/cpp/config-wsl)
6. [prinsss.github.io, 使用 VS Code 搭建适用于 ACM 练习的 C/C++ 开发环境](https://prinsss.github.io/vscode-c-cpp-configuration-for-acm-oj/)
