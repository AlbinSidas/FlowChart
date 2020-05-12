## Selenium install
pip3 install selenium

## HOWTO install Chromedriver for selenium
Download correct chromedriver for chrome version from:
https://chromedriver.storage.googleapis.com/index.html

Instead of "~/chromedriver" Unpack your chromedriver and use the path to the file.
sudo mv -f ~/chromedriver /usr/local/bin/chromedriver
sudo chown root:root /usr/local/bin/chromedriver
sudo chmod 0755 /usr/local/bin/chromedriver

OBS!
It's required to have the geckodriver in an excecutable path, modify this command to fit your system:
export PATH=$PATH:/usr/local/bin/chromedriver

May be needed to give excecutionrights (may have to be in the directory):
chmod +x geckodriver
