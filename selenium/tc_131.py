import sys
from selenium import webdriver
# -----------------------------------------------------------------------------
# TC 131 - Basic log in / log out with pre-existing admin account.
# View user admin page.
# View poem admin page.
# Should check for the presence of a flash message when the login succeeds.
# -----------------------------------------------------------------------------

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

# -----------------------------------------------------------------------------
# Setup and initial URL
# -----------------------------------------------------------------------------
# driver.set_page_load_timeout(30)
driver.get('https://dev.fifteenlines.com/login')
# driver.implicitly_wait(30)

# -----------------------------------------------------------------------------
# Log in
# -----------------------------------------------------------------------------
driver.find_element_by_id('username') \
    .send_keys('brent')
driver.find_element_by_id('password') \
    .send_keys('password')
driver.find_element_by_id('submit').click()
# driver.get_screenshot_as_file('tc_131_a.png')
# driver.find_element_by_id('addPoem')

# -----------------------------------------------------------------------------
# Navigate to user admin page
# -----------------------------------------------------------------------------
driver.find_element_by_id('userManagementLink').click()

# -----------------------------------------------------------------------------
# Navigate to poem admin page
# -----------------------------------------------------------------------------
driver.find_element_by_id('poemManagementLink').click()

# -----------------------------------------------------------------------------
# Log out
# -----------------------------------------------------------------------------
driver.find_element_by_id('logout').click()
# driver.get_screenshot_as_file('tc_131_b.png')
driver.quit()
