// ==UserScript==
// @name         Unaccounted for faction funds
// @namespace    http://tampermonkey.net/
// @version      0.1
// @description  Displays the amount of faction "slush fund" that is not currently allocated to a member.
// @author       Bardicer
// @match        https://www.torn.com/factions.php?step=your
// @grant        none
// ==/UserScript==

(function($) {
    'use strict';
    $(document).ready(function () {
        $(document).delegate("#ui-id-9", "click", function () {
            setTimeout(function () {
                var totalFunds = 0;

                $(".money").each(function () {
                    var memberFunds = parseInt($(this).attr("data-value"));
                    totalFunds += memberFunds;
                });

                var positiveFactionFundsColorCode = "#33cc33";
                var negativeFactionFundsColorCode = "#cc3333";
                var unallocatedFundsText = "$$&nbsp;SLUSH&nbsp;$$";

                var factionFunds = parseInt($(".bold span").attr("data-faction-money"));
                var unallocatedFundsHtml =
                    '<li class="depositor" style="background-color: ' + ((factionFunds > totalFunds) ? positiveFactionFundsColorCode : negativeFactionFundsColorCode) + ';">' +
                    '      <span title="UNACCOUNTED FUNDS" class="bold center" style="margin-top: 2px; display: inline-block;">' + unallocatedFundsText + '</span>' +
                    '      <div class="amount">' +
                    '          <div class="show">' +
                    '              <span class="money" data-value="' + totalFunds + '">' + format(factionFunds - totalFunds) + '</span>' +
                    '              <span title="Edit money" class="actionIcon edit"></span>' +
                    '          </div>' +
                    '       </div>' +
                    '</li>';
                $(".money-depositors").prepend(unallocatedFundsHtml);
            }, 2000);
        });
    });

    var format = function(num){
    var str = num.toString().replace("$", ""), parts = false, output = [], i = 1, formatted = null;
    if(str.indexOf(".") > 0) {
        parts = str.split(".");
        str = parts[0];
    }
    str = str.split("").reverse();
    for(var j = 0, len = str.length; j < len; j++) {
        if(str[j] != ",") {
            output.push(str[j]);
            if(i%3 == 0 && j < (len - 1)) {
                output.push(",");
            }
            i++;
        }
    }
    formatted = output.reverse().join("");
    return("$" + formatted + ((parts) ? "." + parts[1].substr(0, 2) : ""));
};
}(jQuery));
