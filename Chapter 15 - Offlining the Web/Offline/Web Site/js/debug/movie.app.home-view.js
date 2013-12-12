﻿/// <reference path="love2dev.app.js" />
/// <reference path="love2dev.app.api.js" />


(function (window, undefined) {

    "use strict";

    movieApp.fn.homeView = {

        onload: function () {

            var that = this,
                hv = that.homeView,
                i = 0,
                vPanels = document.querySelectorAll(".panel-v-scroll");

            that.setupPanorama();
            that.setMainTitle("Modern Web Movies");

            that.InTheatersMovies(50, 1, function (data) {
                hv.renderHomeMovies.call(that, ".top-box-list", data);
            });

            that.OpeningMovies(50, 1, function (data) {
                hv.renderHomeMovies.call(that, ".opening-movie-list", data);
            });

            that.TopBoxOfficeMovies(50, 1, function (data) {
                hv.renderHomeMovies.call(that, ".movies-near-me-list", data);
            });

            that.CommingSoonMovies(50, 1, function (data) {
                hv.renderHomeMovies.call(that, ".comming-soon-list", data);
            });

            requestAnimationFrame(function () {
                hv.setPanoramaWidth.call(that);
            });            

            that.setupMQL("min600", "(min-width: 600px)", [{
                matchName: "manageHomeView",
                matchFunc: function () {
                    hv.updatePanoramaLayout.call(that);
                    that.panorama.settings.peekWidth = 75;
                },
                nomatchName: "manageHomeView",
                nomatchFunc: function () {
                    hv.updatePanoramaLayout.call(that);
                    that.panorama.settings.peekWidth = 50;
                }
            }]);

            that.setupMQL("min1024", "(min-width: 1024px)", [{
                matchName: "manageHomeView1024",
                matchFunc: function () {
                    hv.updatePanoramaLayout.call(that);
                    that.panorama.settings.peekWidth = 100;
                },
                nomatchName: "manageHomeView1024",
                nomatchFunc: function () {
                    hv.updatePanoramaLayout.call(that);
                    that.panorama.settings.peekWidth = 75;
                }
            }]);

        },

        updatePanoramaLayout: function () {

            var that = this,
                hv = that.homeView;

            hv.setPanoramaWidth.call(that);

            that.setPosterSrc.call(that, ".opening-movie-list .movie-grid-poster");
            that.setPosterSrc.call(that, ".top-box-list .movie-grid-poster");
            that.setPosterSrc.call(that, ".comming-soon-list .movie-grid-poster");
            that.setPosterSrc.call(that, ".movies-near-me-list .movie-grid-poster");

        },

        //unload: function () {
        //  //  delete this.resizeEvents["manageHomeView"];
        //},

        renderHomeMovies : function (target, data) {

            if (!data) {
                return;
            }

            var that = this;

            that.mergeData(target, "MoviePosterGridTemplate", data);

            requestAnimationFrame(function () {
                that.setPosterSrc(target + " .movie-grid-poster");
            });
            
        },

        viewWidth : window.innerWidth,

        setPanoramaWidth : function () {

            var that = this,
                i = 0,
                peekWidth = (that.viewWidth > 600) ? 50 : 30,
                panelWidth = (that.viewWidth - peekWidth),
                panoramaWrapper = document.querySelector(".panorama-panels"),
                panels = document.querySelectorAll(".single-panel"),
                movieGrids = document.querySelectorAll(".movie-poster-grid");

            if (!panoramaWrapper) {
                return;
            }

            for (; i < panels.length; i++) {
                panels[i].style.width = panelWidth + "px";
            }

            if (panoramaWrapper) {
                panoramaWrapper.style.width = (panels.length * panelWidth) + "px";
            }

            that.panorama.resizePanorama();

        }

    };
    
}(window));
