from selenium import webdriver

# -----------------------------------------------------------------------------
# TC 135 - Ensure unable to log in with invalid credentials.
# Check that users are not able to log in with an unknown username
# (an unknown password is needed as well.)  Should check for the presence
# of a flash message when the login fails.
# -----------------------------------------------------------------------------

driver = webdriver.Chrome('D:\Dropbox\WebDev\selenium\chromedriver.exe')
# driver = webdriver.Ie('D:\Dropbox\WebDev\selenium\IEDriverServer.exe')

driver.set_page_load_timeout(30)
driver.get('https://dev.fifteenlines.com/login')
driver.implicitly_wait(20)
driver.find_element_by_name('username') \
    .send_keys('This is not a real username')
driver.find_element_by_name('password') \
    .send_keys('This is not a real password')
driver.find_element_by_id('submit').click()
assert "Password or username is incorrect" in driver.page_source
driver.get_screenshot_as_file('tc_135.png')
driver.quit()
