$("#post-comment").hide();
$("#btn-toggle-comment").click(function(e) {
  e.preventDefault();
  $("#post-comment").slideToggle();
});
$("#btn-like").click(function(e) {
  e.preventDefault();
  let imagId = $(this).data("id");
  // incrementando os likes
  $.post("/images/" + imagId + "/like").done(data => {
    //console.log(data);
    $(".likes-count").text(data.likes);
  });
});
$("#btn-delete").click(function(e) {
  e.preventDefault();
  let $this = $(this);
  const response = confirm("Estas seguro que quer eliminar a Img?");
  if (response) {
    let imagId = $this.data("id");
    $.ajax({
      url: "/images/" + imagId,
      type: "DELETE"
    }).done(function(result) {
      $this.removeClass("btn-danger").addClass("btn-success");
      $this
        .find("i")
        .removeClass("fa-times")
        .addClass("fa-check");
      $this.append("<span>Deleted!</span>");
    });
  }
});
