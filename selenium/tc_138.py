"""TC 138."""
from selenium import webdriver
import csv
import sys
# -----------------------------------------------------------------------------
# TC 138 - View details of a poem while logged in as not the author
#
# By default uses the first entry from signup_10.csv from TC 133 for the user
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
driver.get('https://dev.fifteenlines.com/login')
driver.implicitly_wait(20)

# -----------------------------------------------------------------------------
# Log in a regular user
# -----------------------------------------------------------------------------
with open(datafile) as f:
    reader = csv.reader(f)
    row1 = next(reader)
    assert "Log In" in driver.page_source
    driver.find_element_by_id('username') \
        .send_keys(row1[0])
    driver.find_element_by_id('password') \
        .send_keys(row1[2])
    driver.find_element_by_id('submit').click()
    signedInAs = "Signed in as " + row1[0]
    assert signedInAs in driver.page_source

# -----------------------------------------------------------------------------
# Click the first poem on the homepage.
# -----------------------------------------------------------------------------
driver.find_element_by_css_selector(
    'body > div:nth-child(3) > div > ' +
    'div:nth-child(1) > div.caption > h4 > a').click()

assert 'editPoem' in driver.page_source
assert 'Poem Visibility' not in driver.page_source

driver.quit()
