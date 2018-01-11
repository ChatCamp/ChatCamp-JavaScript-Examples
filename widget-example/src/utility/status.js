let status = {
  getColorFromStatusCode: function(statusCode) {
    if(statusCode === 'A'){
      return "#67a93f"
    }
    else if(statusCode === 'I'){
      return "#ff692b"
    }
    else if(statusCode === 'B'){
      return "#ff1c00"
    }
    else if(statusCode === 'O'){
      return "#999"
    }
    else if(statusCode === '#'){
      return "#fff"
    }
  }
}
export default status;
