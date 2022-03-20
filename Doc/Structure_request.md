

Le back doit répondre à une requete avec un dico sous la forme
```
{
    status: CODE,
    object: OBJ,
    message: MSG
}
```

Le front doit donc vérifier que status === le code attendu