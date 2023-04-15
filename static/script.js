$(document).ready(function(){

    console.log('Ready')

    //  Fetch the current date and update it in the DOM
    var date=new Date()
    let display_date="Date : "+date.toLocaleDateString()

    $("#display_date").html(display_date)


    //  write an event, when Submit button is clicked
    $('#predict_button').click(function(){

        //  get the text value from the textarea using the 'val()' method
        let text_value = $('#text').val()

        //  Convert it to JS object.
        //  Provide a 'key' here and in write the same in app.py file as well to extract data
        let input_text = {'/predictEmo' : text_value}
        console.log(input_text)

        //  ajax request
        $.ajax({

            //  type of web request
            type : 'POST',

            //  Data to be sent in JSON format
            data : JSON.stringify(input_text),

            //  type of response expected is json
            dataType : 'json',

            //  contentType
            contentType : 'application/json',

            //  if everything is successful, run this function
            success : function(result){

                // extract prediction and emoticon url from result
                predicted_emo=result.data.predicted_emo
                emo_url=result.data.image_url


                //  update the DOM elements
                $("#prediction").html(predicted_emotion)
                $("#prediction").css("display","block")
                $("#emo_img_url").attr("src",emo_url)


                //  show them
                $("#emo_img_url").css("display","block")

            },

            //  if any error, run this function
            error : function(result){

                console.log(result)
                alert(result.responseJSON.message)
            }
        })


        //  clearing the textbox after every button push
        $('#text').val("")
    })
        
})