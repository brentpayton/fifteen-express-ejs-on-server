from selenium import webdriver

# -----------------------------------------------------------------------------
# TC 131 - Basic log in / log out with pre-existing admin account.
# View user admin page.
# View poem admin page.
# Should check for the presence of a flash message when the login succeeds.
# -----------------------------------------------------------------------------

# driver = webdriver.Chrome('D:\Dropbox\WebDev\selenium\chromedriver.exe')
driver = webdriver.Firefox()
# driver = webdriver.Ie('D:\Dropbox\WebDev\selenium\IEDriverServer.exe')
# driver = webdriver.Edge()

driver.set_page_load_timeout(30)
driver.get('https://dev.fifteenlines.com/login')
driver.implicitly_wait(20)
# Log in
driver.find_element_by_name('username') \
    .send_keys('brent')
driver.find_element_by_name('password') \
    .send_keys('password')
driver.find_element_by_id('submit').click()
driver.get_screenshot_as_file('tc_131_a.png')
assert "Add a poem" in driver.page_source
# Navigate to user admin page
driver.find_element_by_id('userManagement').click()
assert 'All Users' in driver.page_source
# Navigate to poem admin page
driver.find_element_by_id('poemManagement').click()
assert 'All Poems' in driver.page_source
driver.find_element_by_id('logout').click()
assert 'You have been logged out' in driver.page_source
driver.get_screenshot_as_file('tc_131_b.png')
driver.quit()
