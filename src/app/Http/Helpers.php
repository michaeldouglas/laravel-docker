<?php

function formataNumero($valor = 0.00){
    return number_format($valor, 2, ",", ".");
}

function formataData(string $data)
{

    $data = new \DateTime($data);
    return $data->format("Y-m-d");
}

function getFromCache($key, callable $call, $time = 1)
{
    try {
        if (!Cache::has($key)) {
            Cache::add($key, $call(), $time);
        }
        return Cache::get($key);
        //@codeCoverageIgnoreStart
    } catch (Exception $ex) {
        return $call();
    }
    //@codeCoverageIgnoreEnd
}

function getResponseJson($key, $data, $time = 1)
{

    try {
        if (!Cache::has($key)) {
            Cache::add($key, json_decode($data), $time);
        }
        return response()->json(Cache::get($key));
        //@codeCoverageIgnoreStart
    } catch (Exception $ex) {
        return $ex;
    }
    //@codeCoverageIgnoreEnd
}

function tirarAcentos($string){
    return preg_replace(array("/(á|à|ã|â|ä)/","/(Á|À|Ã|Â|Ä)/","/(é|è|ê|ë)/","/(É|È|Ê|Ë)/","/(í|ì|î|ï)/","/(Í|Ì|Î|Ï)/","/(ó|ò|õ|ô|ö)/","/(Ó|Ò|Õ|Ô|Ö)/","/(ú|ù|û|ü)/","/(Ú|Ù|Û|Ü)/","/(ñ)/","/(Ñ)/","/(ç)/","/(Ç)/"),explode(" ","a A e E i I o O u U n N c C"),$string);
}