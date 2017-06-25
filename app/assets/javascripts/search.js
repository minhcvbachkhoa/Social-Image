var timer, length_str = 100, length_item = 4;
$(document).on('keyup', '#images-search', function() {
  clearTimeout(timer);
  timer = setTimeout(function () {
    var search = $('#images-search').val();
    $.ajax({
      url: '/searches?search=' + search,
      context: document.body,
      dataType: 'json'
    }).done(function(data) {
      $('.results').empty();
      var images = data.results['images'];
      if(images.length) {
        $('.results').append('<p><b>' + I18n.t("images.images") + '</b></p>');
        for (var i = 0; i < images.length; i++) {
          $('.results').append('<a href="/images/' + images[i].id
            +'"><li><span class="images-search-img"><img src="'
            + images[i].image.url + '"></span><span class="images-search-str">'
            + images[i].description.substring(0, length_str) + '</span></li></a><hr>');
          if(i == length_item) break;
        }
      }

      var users = data.results['users'];
      if(users.length) {
        $('.results').append('<p><b>' + I18n.t("list-users") + '</b></p>');
        for (i = 0; i < users.length; i++) {
          $('.results').append('<a href="/users/' + users[i].id +
            '"><li><span class="users-search-img"><img src="'
            + avatar_user(users[i])
            + '"></span><span class="users-search-str">'
            + users[i].name.substring(0, length_str)
            + '</span></li></a><hr>');
          if(i == length_item) break;
        }
      }

      var groups = data.results['groups'];
      if(groups.length) {
        $('.results').append('<p><b>' + I18n.t("list-groups") + '</b></p>');
        for (i = 0; i < groups.length; i++) {
          $('.results').append('<a href="/groups/' + groups[i].id +
            '"><li><span class="users-search-img"><img src="'
            + cover_group(groups[i])
            + '"></span><span class="users-search-str">'
            + groups[i].name.substring(0, length_str)
            + '</span></li></a><hr>');
          if(i == length_item) break;
        }
      }

      $('.results').append('<a href="/searches?search=' + search + '"><li><p>'
        + I18n.t("view-more") + '</p></li></a>');
    });
  }, 100);
});

function avatar_user(user) {
  if(user.avatar.url != null) {
    return user.avatar.url;
  } else {
    return '../../assets/avatar_user.jpg';
  }
}

function cover_group(group) {
  if(group.cover.url != null) {
    return group.cover.url;
  } else {
    return '../../assets/cover_group.jpg';
  }
}
