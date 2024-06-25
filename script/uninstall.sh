#!/bin/sh

read -p "Are you sure you want to uninstall SchoolTastic? (y/N): " confirmation

if [[ $confirmation =~ ^[Yy]$ ]]; then

  echo "[ ! ] Stopping and removing SchoolTastic service..."
  pm2 stop SchoolTastic

  if [[ $? -eq 0 ]]; then
    pm2 delete SchoolTastic
  else
    echo "**[ ! ] Failed to stop SchoolTastic service. You might need to remove it manually using pm2 commands."
  fi

  echo "[ ! ] Removing SchoolTastic directory..."
  rm -rf /usr/bin/SchoolTastic

  read -p "Do you also want to uninstall Bun? (y/N): " bun_uninstall

  if [[ $bun_uninstall =~ ^[Yy]$ ]]; then
    echo "[ ! ] Uninstalling Bun..."
    rm -rf ~/.bun
    echo "[ ! ] Bun has been uninstalled."
  else
    echo "[ ! ] Bun will remain installed."
  fi
  unalias schooltastic-uninstall
  echo "[ ! ] SchoolTastic has been uninstalled."

else
  echo "[ ! ] Uninstallation cancelled."
fi

exit 0
