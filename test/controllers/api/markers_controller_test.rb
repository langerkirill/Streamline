require 'test_helper'

class Api::MarkersControllerTest < ActionDispatch::IntegrationTest
  test "should get new" do
    get api_markers_new_url
    assert_response :success
  end

  test "should get create" do
    get api_markers_create_url
    assert_response :success
  end

  test "should get show" do
    get api_markers_show_url
    assert_response :success
  end

end
