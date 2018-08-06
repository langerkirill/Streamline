require 'test_helper'

class Api::LikesControllerTest < ActionDispatch::IntegrationTest
  test "should get new" do
    get api_likes_new_url
    assert_response :success
  end

  test "should get create" do
    get api_likes_create_url
    assert_response :success
  end

end
