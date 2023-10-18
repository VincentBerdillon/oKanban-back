list(**id** INTEGER, name TEXT, position INTEGER, created_at, updated_at)
card(**id** INTEGER, title TEXT, color TEXT, position INTEGER, #list(id), created_at, updated_at)
tag(**id** INTEGER, name TEXT, color TEXT, created_at, updated_at)
card_has_tag(#card(id), #tag(id), created_at)