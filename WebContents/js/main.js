$(function() {
    $('#txtKeywd').autocomplete({
        source: function(req,res) {
            $.ajax({
                url: window.location.origin + "/auto/" + req.term,
                contentType: 'application/json',
                dataType: "json",
                type: "GET",
                data: {
                    term: req.term
                },
                success: function(data) {
                    console.log(data)
                    res($.map(data, function(item) {
                        return {
                            label: item.word, //text comes from a collection of mongo
                            value: item.word,
                            data: item // save data for get all information
                        };
                    }));
                },
                error: function(xhr) {
                    console.log('[ERROR]' + xhr.status + ' : ' + xhr.statusText);
                }
            });
        },
        select: function(event, ui) {
            console.log(ui.item.data);
            var data = ui.item.data;
            var means = data.means;
            var relatives = data.relatives;

            $('#result').empty();

            var mainDiv = $('<div class="main"></div>');
            mainDiv.append('<span class="word">' + data.word + '</span>');
            mainDiv.append('<span class="phonetic">' + data.phonetic + '</span>');
            $('#result').append(mainDiv);

            $('#result').append(printMeans(means, 'main'));

            var relativesDiv = $('<div class="relatives"></div>');
            for (var i = 0; i < relatives.length; i++) {
                var relative = relatives[i];
                var relativeDiv = $('<div class="relative"></div>');
                relativeDiv.append('<span class="word">' + relative.word + '</span>');
                relativeDiv.append('<span class="phonetic">' + relative.phonetic + '</span>');
                if (relative.means) {
                    relativeDiv.append(printMeans(relative.means, 'relative'));
                }
                relativesDiv.append(relativeDiv);
            }
            $('#result').append(relativesDiv);
        }
    });

    function printMeans(means, typeMean) {
        var meansDiv = $('<div class="' + typeMean + '_means"></div>');
        for (var i = 0; i < means.length; i++) {
            var mean = means[i];
            var meanDiv = $('<div class="' + typeMean + '_mean"></div>');
            meanDiv.append('<div class="submean">' + mean.mean + '</div>');
            if (mean.examples && mean.examples.length > 0) {
                var examplesDiv = $('<div class="examples"></div>');
                for (var j = 0; j < mean.examples.length; j++) {
                    var example = mean.examples[j];
                    var exampleDiv = $('<div class="example"></div>');
                    exampleDiv.append('<div class="content">' + example.content + '</div>');
                    exampleDiv.append('<div class="transcription">' + example.transcription + '</div>');
                    exampleDiv.append('<div class="mean">' + example.mean + '</div>');
                    examplesDiv.append(exampleDiv);
                }
                meanDiv.append(examplesDiv);
            }
            meansDiv.append(meanDiv);
        }
        return meansDiv;
    }
});