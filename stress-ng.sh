#! /bin/sh
set -x

if grep -q "Amazon Linux" /etc/os-release
then
  amazon-linux-extras install epel -y
  yum install stress-ng -y
else
  sudo add-apt-repository ppa:colin-king/stress-ng
  sudo apt update
  sudo apt install stress-ng
fi

stress-ng --cpu 4 --iomix 2 --vm 1 --vm-bytes 1G --timeout 60s --metrics-brief
