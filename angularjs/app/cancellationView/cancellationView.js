/**
 * Copyright 2016-2017 Robin Steel
 *
 * Licensed under the Apache License, Version 2.0 (the "License")
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

'use strict'

angular.module('squashApp.cancellationView', ['ngRoute', 'squashApp.bookingsService'])

  .config(['$routeProvider', function ($routeProvider) {
    $routeProvider.when('/cancellations', {
      templateUrl: 'cancellationView/cancellationView.html',
      controller: 'CancellationViewCtrl as ctrl'
    })
  }])

  .controller('CancellationViewCtrl', ['$scope', '$location', '$timeout', 'BookingService', function ($scope, $location, $timeout, BookingService) {
    var self = this

    self.activeCourt = BookingService.activeCourt
    self.activeCourtSpan = BookingService.activeCourtSpan
    self.activeSlot = BookingService.activeSlot
    self.activeSlotSpan = BookingService.activeSlotSpan
    self.activeSlotIndex = BookingService.activeSlotIndex
    self.activeDate = BookingService.activeDate
    self.activeName = BookingService.activeName
    // Must escape any regex special characters in the name before using in ng-pattern
    self.playersNamesRegex = new RegExp('^' + self.activeName.replace(/[.*+?^${}()|[\]\\]/g, '\\$&') + '$')

    self.returnToBookings = function () {
      $location.url('/bookings')
    }

    self.namesLength = function () {
      // Used to ensure players' names input box is big enough to show all of placeholder text
      var placeholder = 'i.e. ' + self.activeName
      return placeholder.length
    }

    self.submitCancellation = function (form) {
      if (form.$invalid) {
        return
      }

      // The form is valid - so let's cancel the booking
      self.passwordIncorrect = false
      self.unauthenticatedBlockBookingError = false
      self.bookingCancellationFailed = false
      self.cancellationFailed = false
      self.isRetired = false
      self.isReadonly = false
      BookingService.cancelCourt(self.activeCourt, self.activeCourtSpan, self.activeSlotIndex + 1, self.activeSlotSpan, self.activeDate, self.activeName, self.password)
        .then(function (result) {
          self.returnToBookings()
          updateUi()
        })
        .catch(function (error) {
          if ((typeof error.data !== 'undefined') && (error.data.hasOwnProperty('errorMessage'))) {
            if (error.data.errorMessage.startsWith('Cannot access bookings')) {
              // Service is retired - so extract the forwarding url from the error message.
              var message = error.data.errorMessage
              var httpIndex = message.lastIndexOf('http')
              self.forwardingUrl = message.substring(httpIndex)
              self.isRetired = true
            } else if (error.data.errorMessage.startsWith('Cannot mutate bookings or rules - booking service is temporarily readonly')) {
              self.isReadonly = true
            } else if (error.data.errorMessage.indexOf('The password is incorrect') > -1) {
              self.passwordIncorrect = true
            } else if (error.data.errorMessage.indexOf('You must login to manage block bookings') > -1) {
              self.unauthenticatedBlockBookingError = true
            } else if (error.data.errorMessage.indexOf('Booking cancellation failed') > -1) {
              self.bookingCancellationFailed = true
            }
          }
          self.cancellationFailed = true
          updateUi()
        })
    }

    function updateUi () {
      // Wrap in timeout to avoid '$digest already in progress' error.
      $timeout(function () {
        $scope.$apply()
      })
    }
  }])
