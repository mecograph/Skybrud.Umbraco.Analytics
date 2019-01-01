﻿angular.module("umbraco").controller("Skybrud.Analytics.ContentApp", function ($scope, editorState, userService, $http) {

    var vm = this;

    if (editorState.current.id === 0) {
        vm.state = "create";
        return;
    }

    if (editorState.current.variants.length === 1) {

        var state = editorState.current.variants[0].state;

        console.log(state);

        switch (state) {

            case "Published":
            case "PublishedPendingChanges":
                vm.state = "publibshed";
                break;

            case "Draft":
                vm.state = "unpublibshed";
                break;

            default:
                alert("Unknown state: " + state);
                break;

        }

    } else {
        alert("MULTIPLE VARIANTS. FANCY!!!");
    }

    console.log(editorState.current);

    vm.CurrentNodeId = editorState.current.id;
    vm.CurrentNodeAlias = editorState.current.contentTypeAlias;

    var user = userService.getCurrentUser().then(function (user) {
        //console.log(user);
        vm.UserName = user.name;
    });

    vm.blocks = null;

    vm.getBlocks = function() {
        $http.get("/umbraco/backoffice/Skybrud/Analytics/GetBlocks?pageId=" + editorState.current.id).then(function (res) {
            vm.blocks = res.data.blocks;
        }, function(res) {
            console.error(res);
        });
    };

    vm.getBlocks();

});