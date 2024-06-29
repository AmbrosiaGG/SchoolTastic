#!/bin/bash 

read -p "Are you sure you want to uninstall SchoolTastic? (y/N): " confirmation

case $confirmation in
  [Yy])
      echo "[ ! ] Stopping and removing SchoolTastic service..."
      pm2 stop SchoolTastic
      pm2 delete SchoolTastic

      echo "[ ! ] Removing SchoolTastic directory..."
      rm -rf /etc/SchoolTastic

      read -p "Do you also want to uninstall Bun? (y/N): " bun_uninstall

      case $bun_uninstall in
        [Yy])
          echo "[ ! ] Uninstalling Bun..."
          rm -rf ~/.bun
          echo "[ ! ] Bun has been uninstalled."
        ;;
      *)
        echo "[ ! ] Bun will remain installed."
      ;;
      esac
    ;;
  *)
    echo "[ ! ] Uninstallation cancelled." 
    ;;
esac
exit 0
