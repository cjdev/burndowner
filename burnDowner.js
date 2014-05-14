define([
    "underscore","jquery", "flot", "flot-stack"
],function(_,$) {
    var iterationDates = [];

    var flotOptions = {
            xaxis: {
                minTickSize: 1,
                ticks: [[0,'2014-01-01'],[1,'2014-01-02'],[2,'2014-02-05'], [3,"2014-02-06"], [4,"2014-02-07"], [5,"2014-03-06"], [6,"2014-03-07"]]
            },
        };

    function burnDown(data, container){
     var stackedBar ={  
                bars: {
                    show: true,
                    barWidth: .9,
                    align: "center"
                },
                stack: true
            },
         barSeries = [],
         lineSeries = [],
         flotOptions={};
         
    
        function addToBarSeries(label, value){
            var existingSeries = _.find(barSeries, function(val){return val.label===label;});
            //console.log(existingSeries);
            if(existingSeries === undefined){
                existingSeries = _.extend({
                    data: [],
                    label: label 
                },stackedBar);
                barSeries.push(existingSeries);
            }
            existingSeries.data.push(value);
        }
        
        function addToLineSeries(start, end){
            lineSeries.push({data: [start,end]});
        }
     
        $(data).each(function(i, iteration){
            var name = iteration.iteration,
                estimatedVelocity = iteration.estimatedVelocity,
                remaining = iteration.remaining ,
                addedScope = iteration.addedScope ? iteration.addedScope : 0,
                transientWork = iteration.transientWork,
                estimateStart = [i, remaining+addedScope],
                estimateEnd = [Math.ceil((remaining+addedScope)/estimatedVelocity)+i,0];
            
            if(!isNaN(remaining)){ //Avoid nulls from incomplete (likely future) iterations.
                addToBarSeries("Remaining Work", [i,remaining]);
                addToBarSeries("Added Scope", [i,addedScope]);
                for (var key in transientWork) {
                    addToBarSeries(key, [i,transientWork[key]]);
                };

                addToLineSeries(estimateStart, estimateEnd);
            }
            
            iterationDates.push([i,name]);
            

            
        });
        
        console.log(barSeries);
        console.log(lineSeries);
        console.log(iterationDates);
        
        flotOptions = {
            xaxis: {
                minTickSize: 1,
                ticks: iterationDates
            },
        };
        
        if(container){
            $.plot(container, barSeries.concat(lineSeries), flotOptions);
        }
        
        return barSeries.concat(lineSeries);
            ;
        
    }
    
    
            
    return{
        burnDown : burnDown
    }




});
