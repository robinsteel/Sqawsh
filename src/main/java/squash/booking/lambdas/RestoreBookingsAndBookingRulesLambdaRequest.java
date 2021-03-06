/**
 * Copyright 2015-2016 Robin Steel
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

import squash.booking.lambdas.core.Booking;
import squash.booking.lambdas.core.BookingRule;

import java.util.List;

/**
 * Request parameter for the {@link RestoreBookingsAndBookingRulesLambda RestoreBookingsAndBookingRules} lambda function.
 * 
 * @author robinsteel19@outlook.com (Robin Steel)
 */
public class RestoreBookingsAndBookingRulesLambdaRequest {
  List<Booking> bookings;
  List<BookingRule> bookingRules;
  Boolean clearBeforeRestore;

  /**
   *  Returns the bookings to be restored.
   */
  public List<Booking> getBookings() {
    return bookings;
  }

  public void setBookings(List<Booking> bookings) {
    this.bookings = bookings;
  }

  /**
   *  Returns the booking rules to be restored.
   */
  public List<BookingRule> getBookingRules() {
    return bookingRules;
  }

  public void setBookingRules(List<BookingRule> bookingRules) {
    this.bookingRules = bookingRules;
  }

  /**
   *  Returns whether to clear existing bookings and booking rules before restoring with the supplied ones.
   */
  public Boolean getClearBeforeRestore() {
    return clearBeforeRestore;
  }

  public void setClearBeforeRestore(Boolean clearBeforeRestore) {
    this.clearBeforeRestore = clearBeforeRestore;
  }
}