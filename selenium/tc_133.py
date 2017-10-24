from selenium import webdriver
import sys
import csv
# -----------------------------------------------------------------------------
# TC 133 - Create N new local accounts.
#
# By default uses randomly-generated account info from signup_10.csv which
# must be in the same directory as this script.  This must be a simple CSV file
# with user ID, email, and password columns.  No headers.
# The default file was obtained from http://www.mockaroo.com/
# All records found in the CSV file will be processed.  To change the number
# of accounts created, simply generate or manipulate a CSV file.
# -----------------------------------------------------------------------------

datafile = 'signup_10.csv'

# -----------------------------------------------------------------------------
# Process command line argument that specifies the browser.
# -----------------------------------------------------------------------------
# No argument provided
try:
    arg1 = sys.argv[1]
except IndexError:
    driver = webdriver.Chrome()

if 'driver' not in locals():
    if sys.argv[1].lower() == 'chrome':
        driver = webdriver.Chrome()
    elif sys.argv[1].lower() == 'firefox':
        driver = webdriver.Firefox()
    elif sys.argv[1].lower() == 'ie':
        driver = webdriver.Ie()
    elif sys.argv[1].lower() == 'edge':
        driver = webdriver.Edge()
    elif sys.argv[1].lower() == 'opera':
        options = webdriver.ChromeOptions()
        options.binary_location = \
            'C:\\Program Files\\Opera\\48.0.2685.50\\opera.exe'
        driver = webdriver.Opera(opera_options=options)
    # MacOS options
    elif sys.argv[1].lower() == 'safari':
        driver = webdriver.Safari()
    elif sys.argv[1].lower() == 'chromemac':
        driver = webdriver.Chrome
        ('/volumes/OrangeWhite/Dropbox/WebDev/selenium/chromedriver')
    # Argument provided didn't match anything above
    else:
        driver = webdriver.Chrome()

driver.set_page_load_timeout(30)
driver.get('https://dev.fifteenlines.com/register_no_captcha')
driver.implicitly_wait(20)

# -----------------------------------------------------------------------------
# Open specified datafile for reading only
# -----------------------------------------------------------------------------
users = csv.reader(open(datafile, 'r'))

# -----------------------------------------------------------------------------
# Use fields from the datafile to sign up fake users
# -----------------------------------------------------------------------------

for row in users:
    driver.find_element_by_id('username') \
        .send_keys(row[0])
    driver.find_element_by_id('email') \
        .send_keys(row[1])
    driver.find_element_by_id('password') \
        .send_keys(row[2])
    driver.find_element_by_id('signUp').click()
    assert "Welcome to Fifteenlines" in driver.page_source
    driver.find_element_by_id('logout').click()
    driver.get('https://dev.fifteenlines.com/register_no_captcha')

driver.quit()
