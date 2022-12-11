# Get Started

## Debes tener instaladas las siguientes dependencias para poder ejecutar el proyecto

```
    Node JS: https://nodejs.org/es/
    Java 11 SDK : https://www.oracle.com/co/java/technologies/javase/jdk11-archive-downloads.html
    Android Studio: https://developer.android.com/studio?hl=es-419&gclid=Cj0KCQiAnNacBhDvARIsABnDa6_JWJFM2JtVY9JUvFmaaPh7Ew4D0rfSe5XYpIhtWFGoAeAhHQColt8aAtA4EALw_wcB&gclsrc=aw.ds
```
## Pasos a seguir despues de tener las dependencias instaladas:

- Se debe buscar en el menu de inicio "Variables de entorno" y se debe acceder a esta configuracion: 

![image text](https://vpease.files.wordpress.com/2015/09/environment.jpg)

- Aqui se debe añadir las siguientes variables de entorno 

![image text](https://i.stack.imgur.com/8Miqe.png)

- Para saber la ubicacion que debes poner en "3" se debe abrir ejecutar (win + r) y dirigirse al siguiente path: 
 ```
    %LOCALAPPDATA%\Android\Sdk
 ```
- Posteriormente se debe buscar la ubicacion de %LOCALAPPDATA%\Android\Sdk\platform-tools con ayuda de ejecutar y añadir esta ruta a la varible llamada "path" en las variables de entorno 

- dependiendo de como se desee correr el proyecto (emulador o dispositivo fisico) se deben seguir estos pasos: 

para emulador : https://developer.android.com/studio/run/managing-avds?hl=es-419;

para dispositivo fisico: https://reactnative.dev/docs/running-on-device

Despues de haber hecho correctamente todos los pasos se debe dirigir a la consola y navegar hacia esta carpeta para despues ejecutar: 

```
    $ npx react-native start

    $ npx react-native run-android

```

- Si existe algun fallo al ejecutar en un dispositivo fisico que sea de tipo "type error 03" se debe abrir la consola y ejecutar

```
    $  adb uninstall com.eventumapp

    $ npx react-native run-android
```

- Deveria volver a compilar y esta vez si ejecutar

- Otra solucion para posibles errores comunes es hacer los siguientes dos comandos

```
    $ cd android

    $ ./gradlew clean

```

- Si se desea sacar un build de produccion con una apk lista para instalar se debe hacer:

```

    $ cd android

    $ ./gradlew clean

    $ cd ..

    $ npx react-native bundle --platform android --dev false --entry-file index.js --bundle-output android/app/src/main/assets/index.android.bundle --assets-dest android/app/src/main/res/ 

    $ cd android 

```

- antes de continuar debes entrar "android/app/src/main/res" y borrar todas las carpetas que digan "drawable-" y tengan algo seguido del guion (NO BORRAR "drawable" BASE), luego ejecutar los siguientes comandos

```

    $ ./gradlew bundleRelease

    $ cd ..

    $ react-native run-android --variant=release

```

- En este punto se debe tener conectado el telefono al pc si se esta trabajando con movil fisico ya que empezara a compilar el apk para produccion 

- El apk generada se va a encontrar en "android/build/outputs/apk/release", sera app-release.apk y ya estara lista para instalar 

