require 'test_helper'

class Api::ChallengesControllerTest < ActionDispatch::IntegrationTest
  test "should get index" do
    get api_challenges_index_url
    assert_response :success
  end

  test "should get show" do
    get api_challenges_show_url
    assert_response :success
  end

end
