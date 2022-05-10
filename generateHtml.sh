function check_letter_existence() {
  local selected_word=$1
  local guessed_word=$2
  local length=$((${#selected_word} - 1))

  for index_1 in $(seq 0 ${length}); do
    guessed_letter=${guessed_word:${index_1}:1}
    existence[${index_1}]=0

    for index_2 in $(seq 0 ${length}); do
      selected_letter=${selected_word:${index_2}:1}

      if [[ ${guessed_letter} == ${selected_letter} ]]; then
        existence[${index_1}]=1

        if [[ ${index_1} == ${index_2} ]]; then
          existence[${index_1}]=2
          break
        fi
      fi
    done
  done

  echo ${existence[@]}
}

function get_random_number() {
  local limit=$1
  jot -r 1 0 ${limit}
}

function get_random_word() {
  local words=($1)

  local last_index=$((${#words[@]} - 1))
  local random_number=$(get_random_number ${last_index})
  echo ${words[${random_number}]}
}

function generate_html {
  local tag=$1
  local class=$2
  local content=$3

  echo "<${tag} class=\"${class}\">${content}</${tag}>"
}

function get_class() {
  local flag=$1

  if [[ ${flag} == 0 ]]; then
    class="not-match"
  elif [[ ${flag} == 1 ]]; then
    class="match"
  elif [[ ${flag} == 2 ]]; then
    class="exact-match"
  else
    class="empty"
  fi
  echo ${class}
}

function capitalize() {
  local word=$1
  tr [:lower:] [:upper:] <<<${word}
}

function generate_letter_html() {
  local word=$1
  local similarities=$2

  local capitalized_word=$(capitalize "${word}")
  local last_index=$((${#word} - 1))
  local letter_html

  for index in $(seq 0 ${last_index})
  do
    local class=$(get_class ${similarities:${index}:1})
    local letter=${capitalized_word:${index}:1}
    letter_html+=$(generate_html "div" "${class} letter" "${letter}")
  done

  echo "${letter_html}"
}

function generate_page() {
  local wordle_template=$1
  local word=($2)
  local similarities=($3)
  local last_index=$((${#word[@]} - 1))
  local word_html

  for index in `seq 0 ${last_index}`
  do
    local letter_html=$(generate_letter_html "${word[${index}]}" "${similarities[${index}]}")
    word_html+=$(generate_html "div" "word" "${letter_html}")
  done

  sed s:__WORDS__:"${word_html}": templates/wordle_template > html/wordle.html
  open html/wordle.html
}

function launch_wordle() {
  local selected_word=$1
  local guessed_word similarities
  
  for limit in $(seq 0 ${#selected_word}); do
    read guessed_word[${limit}]
    similarities[${limit}]="$(check_letter_existence "${selected_word}" "${guessed_word[${limit}]}" | tr " " "\0")" 
    generate_page "" "${guessed_word[*]}" "${similarities[*]}"

    if [[ "${selected_word}" == "${guessed_word[${limit}]}" ]]; then
      return 0
    fi
  done

  return 1
}

function main() {
  local words_file=$1
  local words=($(cat ${words_file}))
  local selected_word=$(get_random_word "${words[*]}")

  echo "Guess ${#selected_word} letter word."
  local game_status="Lost"

  launch_wordle "${selected_word}"
  local status=$?

  if [[ ${status} == 0 ]]; then
    game_status="Won"
  fi

  echo -e "\nYou ${game_status}\nWord is ${selected_word}"
}
