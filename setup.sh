#! /bin/bash

if [ $(uname -s) == "Darwin" ]; then
    echo "Installing command line tools..."
    xcode-select --install

    echo "Installing homebrew..."
    /usr/bin/ruby -e "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/master/install)"

    echo "Installing Brew Cask..."
    brew tap caskroom/cask

    echo "Installing Dev tools..."
    echo " --> Install: Vagrant..."
    brew install vagrant
    echo " --> Install: Virtualbox..."
    brew cask install virtualbox

    echo "Recommendations:"
    echo " 1. Install the Hack typeface: http://sourcefoundry.org/hack/"
    echo "    - make it your default font in the terminal and text editors"
    echo " 2. Install iTerm2: http://iterm2.com"
    echo " 3. Install Oh-My-Zsh: http://ohmyz.sh"
    echo " 4. Open iTerm2 preferences and set a theme you like (check out more here: https://github.com/mbadolato/iTerm2-Color-Schemes)"
    echo " 5. Set aliases in your ~/.zshrc (~/.bashrc if not using zsh) for git"
    echo "    - alias gc='git commit -m'"
    echo "    - alias gd='git diff'"
    echo "    - alias ga='git add'"
    echo ""
    echo "And we're done! Make sure to do all your development in a DevX Docker container for your stack. We recommend running docker in a vagrant machine to avoid cluttering your computer."
    echo "If you choose not to use Vagrant for development, make sure to install docker."
elif [ $(uname -s) == "Linux" ]; then
    echo "We recommended you install vagrant and virtualbox, then develop in the VM."
    echo "If you are confident that you do not want to do that, feel free to set up your own dev environment."
    echo "You can look at the vagrant-provision.sh script to see which dev tools you want to install."
else
    echo "Unsupported platform"
fi
