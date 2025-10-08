# YUM Package Manager Script

A comprehensive bash script for managing packages and repositories on Linux systems using yum.

## Features

- **Repository Management**: Update, clean, and configure yum repositories
- **Package Operations**: Install, update, remove, and search packages
- **System Maintenance**: Full system updates and upgrades
- **Error Handling**: Comprehensive error checking and logging
- **Colorized Output**: Easy-to-read colored terminal output
- **Flexible Commands**: Multiple operation modes for different use cases

## Prerequisites

- Linux system with yum package manager (RHEL, CentOS, Fedora, etc.)
- Root or sudo privileges
- Internet connection for package downloads

## Installation

1. Download the script:
```bash
wget https://raw.githubusercontent.com/your-repo/yum-package-manager.sh
# or
curl -O https://raw.githubusercontent.com/your-repo/yum-package-manager.sh
```

2. Make it executable:
```bash
chmod +x yum-package-manager.sh
```

3. Move to system path (optional):
```bash
sudo mv yum-package-manager.sh /usr/local/bin/yum-manager
```

## Usage

### Basic Commands

```bash
# Update repositories
sudo ./yum-package-manager.sh update-repos

# Install packages
sudo ./yum-package-manager.sh install nginx httpd mysql

# Update all packages
sudo ./yum-package-manager.sh update

# Full system update (recommended)
sudo ./yum-package-manager.sh full-update
```

### Repository Management

```bash
# Clean yum cache
sudo ./yum-package-manager.sh clean-cache

# Add EPEL repository
sudo ./yum-package-manager.sh add-epel

# List all repositories
sudo ./yum-package-manager.sh list-repos

# Enable/disable repositories
sudo ./yum-package-manager.sh enable-repo epel
sudo ./yum-package-manager.sh disable-repo epel
```

### Package Operations

```bash
# Search for packages
sudo ./yum-package-manager.sh search python

# Show package information
sudo ./yum-package-manager.sh info nginx

# List installed packages
sudo ./yum-package-manager.sh list

# Remove packages
sudo ./yum-package-manager.sh remove old-package

# Check for updates
sudo ./yum-package-manager.sh check-updates
```

## Command Reference

| Command | Description | Example |
|---------|-------------|---------|
| `update-repos` | Update yum repositories | `sudo ./script.sh update-repos` |
| `clean-cache` | Clean yum cache | `sudo ./script.sh clean-cache` |
| `install <packages>` | Install specified packages | `sudo ./script.sh install nginx httpd` |
| `update` | Update all installed packages | `sudo ./script.sh update` |
| `upgrade` | Upgrade system | `sudo ./script.sh upgrade` |
| `add-epel` | Add EPEL repository | `sudo ./script.sh add-epel` |
| `list` | List installed packages | `sudo ./script.sh list` |
| `search <term>` | Search for packages | `sudo ./script.sh search python` |
| `remove <packages>` | Remove specified packages | `sudo ./script.sh remove old-package` |
| `info <package>` | Show package information | `sudo ./script.sh info nginx` |
| `check-updates` | Check for available updates | `sudo ./script.sh check-updates` |
| `list-repos` | List configured repositories | `sudo ./script.sh list-repos` |
| `enable-repo <name>` | Enable repository | `sudo ./script.sh enable-repo epel` |
| `disable-repo <name>` | Disable repository | `sudo ./script.sh disable-repo epel` |
| `full-update` | Complete system update | `sudo ./script.sh full-update` |
| `help` | Show help message | `sudo ./script.sh help` |

## Common Use Cases

### Initial System Setup
```bash
# Full system update
sudo ./yum-package-manager.sh full-update

# Add EPEL for additional packages
sudo ./yum-package-manager.sh add-epel

# Install common packages
sudo ./yum-package-manager.sh install vim wget curl git
```

### Regular Maintenance
```bash
# Weekly system update
sudo ./yum-package-manager.sh full-update

# Check for updates without installing
sudo ./yum-package-manager.sh check-updates
```

### Package Management
```bash
# Install web server stack
sudo ./yum-package-manager.sh install nginx httpd php mysql

# Search for development tools
sudo ./yum-package-manager.sh search python3

# Remove unused packages
sudo ./yum-package-manager.sh remove old-package
```

## Error Handling

The script includes comprehensive error handling:

- **Root Check**: Ensures script runs with proper privileges
- **Command Validation**: Validates command arguments
- **Exit Codes**: Proper exit codes for automation
- **Logging**: Timestamped log messages with color coding
- **Error Recovery**: Graceful handling of failed operations

## Logging

The script provides colorized output:
- 🔵 **Blue**: General information and timestamps
- 🟢 **Green**: Success messages
- 🟡 **Yellow**: Warning messages
- 🔴 **Red**: Error messages

## Automation

The script can be used in automation scripts:

```bash
#!/bin/bash
# Automated system maintenance
sudo ./yum-package-manager.sh full-update
sudo ./yum-package-manager.sh clean-cache
```

## Troubleshooting

### Common Issues

1. **Permission Denied**: Ensure you're running with sudo
2. **Network Issues**: Check internet connection
3. **Repository Errors**: Try cleaning cache and updating repos
4. **Package Conflicts**: Use `yum info` to check dependencies

### Debug Mode

For detailed output, you can modify the script to include `set -x` for debug mode.

## Contributing

Feel free to submit issues and enhancement requests!

## License

This script is provided as-is for educational and practical use.
