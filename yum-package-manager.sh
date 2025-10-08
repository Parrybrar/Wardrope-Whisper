#!/bin/bash

# YUM Package Manager Script
# This script handles package installation, updates, and repository management

set -e  # Exit on any error

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

# Logging function
log() {
    echo -e "${BLUE}[$(date '+%Y-%m-%d %H:%M:%S')]${NC} $1"
}

error() {
    echo -e "${RED}[ERROR]${NC} $1" >&2
}

success() {
    echo -e "${GREEN}[SUCCESS]${NC} $1"
}

warning() {
    echo -e "${YELLOW}[WARNING]${NC} $1"
}

# Function to check if running as root
check_root() {
    if [[ $EUID -ne 0 ]]; then
        error "This script must be run as root (use sudo)"
        exit 1
    fi
}

# Function to update yum repositories
update_repos() {
    log "Updating yum repositories..."
    if yum update -y; then
        success "Repositories updated successfully"
    else
        error "Failed to update repositories"
        exit 1
    fi
}

# Function to clean yum cache
clean_cache() {
    log "Cleaning yum cache..."
    yum clean all
    success "Cache cleaned successfully"
}

# Function to install packages
install_packages() {
    local packages=("$@")
    if [ ${#packages[@]} -eq 0 ]; then
        error "No packages specified for installation"
        return 1
    fi
    
    log "Installing packages: ${packages[*]}"
    if yum install -y "${packages[@]}"; then
        success "Packages installed successfully: ${packages[*]}"
    else
        error "Failed to install packages: ${packages[*]}"
        return 1
    fi
}

# Function to update all packages
update_all_packages() {
    log "Updating all installed packages..."
    if yum update -y; then
        success "All packages updated successfully"
    else
        error "Failed to update packages"
        return 1
    fi
}

# Function to upgrade system
upgrade_system() {
    log "Upgrading system..."
    if yum upgrade -y; then
        success "System upgraded successfully"
    else
        error "Failed to upgrade system"
        return 1
    fi
}

# Function to add EPEL repository
add_epel_repo() {
    log "Adding EPEL repository..."
    if yum install -y epel-release; then
        success "EPEL repository added successfully"
    else
        error "Failed to add EPEL repository"
        return 1
    fi
}

# Function to list installed packages
list_installed() {
    log "Listing installed packages..."
    yum list installed
}

# Function to search packages
search_packages() {
    local search_term="$1"
    if [ -z "$search_term" ]; then
        error "No search term provided"
        return 1
    fi
    
    log "Searching for packages: $search_term"
    yum search "$search_term"
}

# Function to remove packages
remove_packages() {
    local packages=("$@")
    if [ ${#packages[@]} -eq 0 ]; then
        error "No packages specified for removal"
        return 1
    fi
    
    log "Removing packages: ${packages[*]}"
    if yum remove -y "${packages[@]}"; then
        success "Packages removed successfully: ${packages[*]}"
    else
        error "Failed to remove packages: ${packages[*]}"
        return 1
    fi
}

# Function to show package information
show_package_info() {
    local package="$1"
    if [ -z "$package" ]; then
        error "No package specified"
        return 1
    fi
    
    log "Showing information for package: $package"
    yum info "$package"
}

# Function to check for updates
check_updates() {
    log "Checking for available updates..."
    yum check-update || true  # Don't fail if no updates available
}

# Function to show repository list
list_repos() {
    log "Listing configured repositories..."
    yum repolist all
}

# Function to enable/disable repository
toggle_repo() {
    local repo_name="$1"
    local action="$2"  # "enable" or "disable"
    
    if [ -z "$repo_name" ] || [ -z "$action" ]; then
        error "Repository name and action (enable/disable) required"
        return 1
    fi
    
    log "${action^}ing repository: $repo_name"
    if yum-config-manager --$action "$repo_name"; then
        success "Repository $repo_name ${action}d successfully"
    else
        error "Failed to $action repository $repo_name"
        return 1
    fi
}

# Main function with command line argument handling
main() {
    # Check if running as root
    check_root
    
    # Parse command line arguments
    case "${1:-help}" in
        "update-repos")
            update_repos
            ;;
        "clean-cache")
            clean_cache
            ;;
        "install")
            shift
            install_packages "$@"
            ;;
        "update")
            update_all_packages
            ;;
        "upgrade")
            upgrade_system
            ;;
        "add-epel")
            add_epel_repo
            ;;
        "list")
            list_installed
            ;;
        "search")
            shift
            search_packages "$@"
            ;;
        "remove")
            shift
            remove_packages "$@"
            ;;
        "info")
            shift
            show_package_info "$@"
            ;;
        "check-updates")
            check_updates
            ;;
        "list-repos")
            list_repos
            ;;
        "enable-repo")
            shift
            toggle_repo "$1" "enable"
            ;;
        "disable-repo")
            shift
            toggle_repo "$1" "disable"
            ;;
        "full-update")
            log "Performing full system update..."
            clean_cache
            update_repos
            update_all_packages
            success "Full system update completed"
            ;;
        "help"|*)
            echo "YUM Package Manager Script"
            echo "Usage: $0 <command> [options]"
            echo ""
            echo "Commands:"
            echo "  update-repos          Update yum repositories"
            echo "  clean-cache           Clean yum cache"
            echo "  install <packages>    Install specified packages"
            echo "  update                Update all installed packages"
            echo "  upgrade               Upgrade system"
            echo "  add-epel              Add EPEL repository"
            echo "  list                  List installed packages"
            echo "  search <term>         Search for packages"
            echo "  remove <packages>     Remove specified packages"
            echo "  info <package>        Show package information"
            echo "  check-updates         Check for available updates"
            echo "  list-repos            List configured repositories"
            echo "  enable-repo <name>    Enable repository"
            echo "  disable-repo <name>   Disable repository"
            echo "  full-update           Clean cache, update repos, and update packages"
            echo "  help                  Show this help message"
            echo ""
            echo "Examples:"
            echo "  $0 install nginx httpd"
            echo "  $0 search python"
            echo "  $0 remove old-package"
            echo "  $0 full-update"
            ;;
    esac
}

# Run main function with all arguments
main "$@"
