/**
 * Copyright 2016 Robin Steel
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *    http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

package squash.booking.lambdas;

/**
 * Request parameter for the {@link GetBookingRulesLambda GetBookingRules} lambda function.
 * 
 * @author robinsteel19@outlook.com (Robin Steel)
 */
public class GetBookingRulesLambdaRequest {
  String redirectUrl;
  String requestId;

  public String getRequestId() {
    return requestId;
  }

  /**
   *  Sets the ApiGateway Request Id - used to allow end-end tracing.
   *  
   *  @param requestId is the ApiGateway request Id.
   */
  public void setRequestId(String requestId) {
    this.requestId = requestId;
  }

  public String getRedirectUrl() {
    return redirectUrl;
  }

  /**
   *  Sets the Url to redirect client to if the GetBookingRules call fails.
   *
   * @param redirectUrl the Url to which the client will be redirected.
   */
  public void setRedirectUrl(String redirectUrl) {
    this.redirectUrl = redirectUrl;
  }
}