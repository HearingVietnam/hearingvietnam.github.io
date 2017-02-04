/* 
 * Gerneral Plugins - plugins.js 
 * Copyright (C) 2017  Chiayo Lin <chiayo.lin@gmail.com>
 *
 * This program is free software: you can redistribute it and/or modify
 * it under the terms of the GNU General Public License as published by
 * the Free Software Foundation, either version 3 of the License, or
 * any later version.
 *
 * This program is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE. See the
 * GNU General Public License for more details.
 * You should have received a copy of the GNU General Public License
 * along with this program. If not, see <http://www.gnu.org/licenses/>.
 *
 */

/* transparent navbar */
$(window).scroll(() => {
  if($(window).scrollTop() > 50) {
    $("#opaque-navbar").addClass("opaque");
    //$("#navbar-text").show()
    //$("#navbar-logo").hide()
  } else {
    $("#opaque-navbar").removeClass("opaque");
    //$("#navbar-text").hide()
    //$("#navbar-logo").show() 
  }});

/* loop multiple videos and display captions */
// make the caption reponsive
function resizeOverlay(h) {
  $("div.overlay").css("height", h < 560 ? h : h - 80);
}

$(() => {
  $("#feature-clip-caption-1").show()
  resizeOverlay($("div.feature-clip-wrapper").height())});

$(window).resize(() => {
  resizeOverlay($("div.feature-clip-wrapper").height())});

$("#feature-clip").on("ended", () => {
  ((id) => {
    var select = (query, _id = id) => document.querySelector(_id + query);
    
    var now  = select(" source.active");
    var next = select(" source.active + source") || 
               select(" source:first-child");
  
    now.className  = "";
    next.className = "active";
    console.log($("div.feature-clip-wrapper").height())
    
    // The ID for each video caption has a format of "#feature-clip-caption-X"
    // where X is a number conresponding to a video source based on the order
    // that video play. And the "<source/> "in HTML has an attribute called
    // "sizes". Thus, we can use this attribute to store the number that we
    // will use to find the conresponding caption. This is sort of a hack!!!!
    $("#feature-clip-caption-" + now.sizes).hide();
    $("#feature-clip-caption-" + next.sizes).show();
    
    $(id)[0].src = next.src;
    $(id)[0].play();
  })("#feature-clip")});

$(() => $('[data-toggle="tooltip"]').tooltip());