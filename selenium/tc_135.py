from selenium import webdriver
import sys
# -----------------------------------------------------------------------------
# TC 135 - Ensure unable to log in with invalid credentials.
# Check that users are not able to log in with an unknown username
# (an unknown password is needed as well.)  Should check for the presence
# of a flash message when the login fails.
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

driver.set_page_load_timeout(30)
driver.get('https://dev.fifteenlines.com/login')
driver.implicitly_wait(20)

driver.find_element_by_name('username') \
    .send_keys('This is not a real username')
driver.find_element_by_name('password') \
    .send_keys('This is not a real password')
driver.find_element_by_id('submit').click()
assert "Password or username is incorrect" in driver.page_source
# driver.get_screenshot_as_file('tc_135.png')
driver.quit()
