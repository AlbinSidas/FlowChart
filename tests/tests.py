import unittest, time
from selenium import webdriver
from selenium.webdriver.common.keys import Keys
from selenium.webdriver.common.by import By
from selenium.webdriver.support.ui import WebDriverWait
from selenium.webdriver.support import expected_conditions as EC
from selenium.webdriver.common.action_chains import ActionChains


# Selenium dokumentation: 
# https://selenium-python.readthedocs.io/api.html

flowchart_square = "IlIxhmMyTdSCZV1cxWXFv"

class FlowChartTest(unittest.TestCase):
    
    
    def setUp(self):
        self.browser = webdriver.Chrome()
        self.browser.maximize_window()
        self.browser.get("localhost:9000")
        self.assertEqual("Flowchart", self.browser.title)

    """ def test_create_object(self):
        new_object_btn = self.browser.find_element_by_id('newObject')
        workspace = self.browser.find_element_by_id('workspace-root')
        
        new_object_btn.click()

        self.assertTrue( True, "flow-node" in self.browser.find_element_by_id('workspace-root').get_attribute('innerHTML')) """
        
    """ def test_mark_and_demark(self):
        new_object_btn = self.browser.find_element_by_id('newObject')
        workspace = self.browser.find_element_by_id('workspace-root')

        new_object_btn.click()

        time.sleep(0.05)

        square = self.browser.find_element_by_class_name(flowchart_square)
        square.click()
        time.sleep(2)
        self.assertTrue( True, "box-shadow" in self.browser.find_element_by_id('workspace-root').get_attribute('innerHTML'))
        
        time.sleep(0.05)
        workspace.click()
        self.assertTrue( True, "box-shadow" not in self.browser.find_element_by_id('workspace-root').get_attribute('innerHTML'))
        time.sleep(1) """


    """ def test_drag_and_drop_flowchart_square(self):
        new_obj_btn = self.browser.find_element_by_id("newObject")
        new_obj_btn.click()

        time.sleep(0.2)
        square = self.browser.find_element_by_class_name(flowchart_square)
        action_chains = ActionChains(self.browser)
        action_chains.drag_and_drop_by_offset(square, 300, 400).perform()
        time.sleep(2) """

    
    def test_connecting_different_squares(self):
        new_obj_btn = self.browser.find_element_by_id("newObject")
        new_obj_btn.click()
        time.sleep(0.2)
        new_obj_btn.click()

        time.sleep(0.2)
        square = self.browser.find_element_by_class_name(flowchart_square)

        time.sleep(0.2)
        action_chains = ActionChains(self.browser)
        action_chains.drag_and_drop_by_offset(square, 300, 300).perform()
        action_chains.reset_actions()

        all_squares = self.browser.find_elements(By.CLASS_NAME, flowchart_square)

        time.sleep(0.2)
        action_chains.drag_and_drop_by_offset(all_squares[1], 300, 550).perform()
        action_chains.reset_actions()

        wroot = self.browser.find_element_by_id("workspace-root")
        action_chains.move_to_element_with_offset(wroot, 450, 210).click().perform()
        action_chains.release().perform()
        action_chains.reset_actions()
        action_chains.move_to_element_with_offset(wroot, 750, 390).click().perform()


        print("\n Square 1 location: " + str(square.location))
        """ output_id = square.get_attribute("id") + "box-output"
        square_output = self.browser.find_element_by_id(output_id)
        action_chains.click(square_output).perform()
        action_chains.reset_actions() """

        print("\n Square 2 location: " + str(all_squares[1].location))
        """ input_id = all_squares[1].get_attribute("id") + "box-input"
        square_2_input = self.browser.find_element_by_id(input_id)

        
        action_chains.click(square_2_input).perform()
        action_chains.reset_actions() """
        time.sleep(50000)
        

        
    
    """ def tearDown(self):
        self.browser.quit() """

if __name__ == '__main__':
    unittest.main(verbosity=2)