# admonition

admonition 는 다양한 서식을 사용할 수 있습니다. 테마에 따라 지원하는 키워드가 다르긴합니다만 아래 키워드들은 사용가능합니다.

루트에 있는 `mkdocs.yml` 에서 확장기능을 사용할 수 있도록 지정만 해주면 됩니다.

```yml
markdown_extensions:
  - admonition
```





## Note

결과:

!!! note "서식의 제목"
    "note" 라는 키워드를 이용하여 서식을 사용할 수 있습니다.  
    "note" 라는 키워드를 이용하여 서식을 사용할 수 있습니다.  
    "note" 라는 키워드를 이용하여 서식을 사용할 수 있습니다.


예제:

```md
!!! note "서식의 제목"
    "note" 라는 키워드를 이용하여 서식을 사용할 수 있습니다.  
    "note" 라는 키워드를 이용하여 서식을 사용할 수 있습니다.  
    "note" 라는 키워드를 이용하여 서식을 사용할 수 있습니다.
```

제목이 없는 경우

!!! note ""
    "note" 라는 키워드를 이용하여 서식을 사용할 수 있습니다.  
    "note" 라는 키워드를 이용하여 서식을 사용할 수 있습니다.  
    "note" 라는 키워드를 이용하여 서식을 사용할 수 있습니다.

아래처럼 입력하면 됩니다.

```
!!! note ""
    "note" 라는 키워드를 이용하여 서식을 사용할 수 있습니다.  
    "note" 라는 키워드를 이용하여 서식을 사용할 수 있습니다.  
    "note" 라는 키워드를 이용하여 서식을 사용할 수 있습니다.
```

`note` 처럼 사용할 수 있는 키워드가 더 있습니다.


## Tip

예제:

```md
!!! tip
    Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla et euismod
    nulla. Curabitur feugiat, tortor non consequat finibus, justo purus auctor
    massa, nec semper lorem quam in massa.
```

결과:

!!! tip

    Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla et euismod
    nulla. Curabitur feugiat, tortor non consequat finibus, justo purus auctor
    massa, nec semper lorem quam in massa.



## Warning

예제:

```markdown
!!! warning
    Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla et euismod
    nulla. Curabitur feugiat, tortor non consequat finibus, justo purus auctor
    massa, nec semper lorem quam in massa.
```

결과:

!!! warning

    Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla et euismod
    nulla. Curabitur feugiat, tortor non consequat finibus, justo purus auctor
    massa, nec semper lorem quam in massa.




## Danger

예제:

```markdown
!!! danger
    Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla et euismod
    nulla. Curabitur feugiat, tortor non consequat finibus, justo purus auctor
    massa, nec semper lorem quam in massa.
```

결과:

!!! danger

    Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla et euismod
    nulla. Curabitur feugiat, tortor non consequat finibus, justo purus auctor
    massa, nec semper lorem quam in massa.



## PyMdown

[PyMdown](https://facelessuser.github.io/pymdown-extensions/) 확장기능을 사용하면 더 많은 기능을 사용할 수 있습니다.

아래처럼 설치한후 설정에서 사용하고 싶은 기능을 지정해주면 됩니다.

```console
pip install pymdown-extensions
```

[PyMdown 기능보기](https://facelessuser.github.io/pymdown-extensions/)