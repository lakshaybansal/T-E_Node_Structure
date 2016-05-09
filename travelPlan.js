/**
 * Created by lenovo on 09-05-2016.
 */

var app = angular.module("app", []).component("travelPlan", {

    templateUrl: "travelPlanDiv.html",
    controllerAs: "plan",
    controller: ["$http", travelPlanController]

}).filter('keylength', function () {
    return function (input) {
        if (!angular.isObject(input)) {
            throw Error("Usage of non-objects with keylength filter!!")
        }
        return Object.keys(input).length;
    }
});

function travelPlanController($http) {

    var plan = this;
    plan.travelPlanJSON = {};
    plan.$onInit = function () {
        fetchTravelplanJSON($http).then(function (travelJSON) {
            plan.travelPlanJSON = travelJSON;
        })
    }

    plan.addNode = function (nodeIndex) {

        var nodeIdNumber = nodeIndex + 2;
        var edgeIdNumber = nodeIndex + 1;

        var nodeId = "node" + nodeIdNumber;
        var edgeId = "edge" + edgeIdNumber;
        var newNode = {
            "cityName": "",
            "status": "",
            "childServices": {
                "nodeS1": {
                    "type": "",
                    "status": "",
                    "request": {
                        "area": "",
                        "rating": "",
                        "roomType": "",
                        "checkinDate": "",
                        "checkoutDate": ""
                    },
                    "final": {
                        "image": "",
                        "name": "",
                        "rating": "",
                        "location": "",
                        "roomType": "",
                        "checkinDate": "",
                        "checkinTime": "",
                        "checkoutDate": "",
                        "checkoutTime": "",
                        "price": "",
                        "comments": ""
                    }
                },
                "nodeT1": {
                    "type": "",
                    "status": "",
                    "request": {
                        "source": "",
                        "destination": "",
                        "type": "",
                        "pickupDate": "",
                        "pickupTime": ""
                    },
                    "final": {
                        "source": "",
                        "destination": "",
                        "type": "",
                        "pickupDate": "",
                        "pickupTime": "",
                        "dropDate": "",
                        "dropTime": "",
                        "cab": {
                            "image": "",
                            "companyName": "",
                            "cabNumber": "",
                            "driverDetails": {
                                "name": ""
                            },
                            "estimatedPrice": "",
                            "cabType": ""
                        },
                        "bus": {
                            "image": "",
                            "companyName": "",
                            "busNumber": "",
                            "busType": "",
                            "seatsType": "",
                            "price": ""
                        }
                    }
                }
            }
        };
        var newEdge = {
            "status": "",
            "childServices": {
                "edgeMode1": {
                    "status": "",
                    "request": {
                        "travelStartDate": "",
                        "mode": "Flight",
                        "flight": {
                            "state": "",
                            "class": "",
                            "Nonstop": ""
                        },
                        "bus": {
                            "state": "",
                            "class": "",
                            "seatType": ""
                        },
                        "train": {
                            "state": "",
                            "class": ""
                        }
                    },
                    "final": {
                        "travelStartDate": "",
                        "mode": "",
                        "flight": {
                            "companyName": "",
                            "flightID": "",
                            "seatNumber": "",
                            "price": "",
                            "preferences": {
                                "class": "",
                                "Nonstop": "",
                                "meals": "",
                                "extra Baggage": ""
                            }
                        },
                        "bus": {
                            "companyName": "",
                            "busNumber": "",
                            "seatNumber": "",
                            "price": "",
                            "preferences": {
                                "class": "",
                                "seatType": ""
                            }
                        },
                        "train": {
                            "companyName": "",
                            "trainNumber": "",
                            "seatNumber": "",
                            "coachNumber": "",
                            "price": "",
                            "preferences": {
                                "class": ""
                            }
                        },
                        "travelStartTime": "",
                        "travelEndDate": "",
                        "travelEndTime": ""
                    }
                }
            }
        };

        plan.travelPlanJSON.nodes[nodeId] = newNode;
        plan.travelPlanJSON.edges[edgeId] = newEdge;
    }

    plan.subNode = function (nodeIndex) {

        var deleteNodeIDnumber = nodeIndex + 1;
        var deleteEdgeIDnumber = nodeIndex;

        var nodeId = "node" + deleteNodeIDnumber;
        var edgeId = "edge" + deleteEdgeIDnumber;

        delete plan.travelPlanJSON.nodes[nodeId];
        delete plan.travelPlanJSON.edges[edgeId];

    };

    plan.node_md_action_show = function (x) {

        if (x.show == false) {
            x.show = true;
        } else {
            x.show = false;
        }

    }

}


function fetchTravelplanJSON($http) {

    return $http.get("travelplan.json").then(function (response) {
        return response.data;

    })

}