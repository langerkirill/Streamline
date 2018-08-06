require 'test_helper'

class KudosControllerTest < ActionDispatch::IntegrationTest
  test "should get new" do
    get kudos_new_url
    assert_response :success
  end

  test "should get create" do
    get kudos_create_url
    assert_response :success
  end

end
