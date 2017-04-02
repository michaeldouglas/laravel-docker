<?php

namespace wmvisit\Http\Controllers;

use Illuminate\Http\Request;

class RequestController extends Controller
{
    const VERSION = '20151116170100';

    public $info = [
        "result" => ""
    ];

    public function getLocale()
    {
        $json = '
            {  
   "LANGUAGE":"Idioma",
   "LANGUAGES":"Idiomas",
   "LANGUAGE_PORTUGUESE":"Portugu\u00eas",
   "LANGUAGE_ENGLISH":"Ingl\u00eas",
   "LANGUAGE_SPANISH":"Espanhol",
   "OUR_TEST_PLATFORM":"Teste nossa plataforma",
   "WHAT_IS":"O que \u00e9 o Visit?",
   "PERFORM_TEST":"Realizar Teste",
   "HELP_SUPPORT":"Ajuda e Suporte",
   "CODE":"C\u00f3digo",
   "PASSWORD":"Senha",
   "LEARN_MORE":"Saiba Mais",
   "CHECK_COMPATIBILITY":"Verifique sua compatibilidade",
   "DEMOSTRATION_WM":"Demonstra\u00e7\u00e3o do WebMeeting",
   "SUPPORT_PHONE":"suporte por telefone",
   "SUPPORT_EMAIL":"suporte via e-mail",
   "FAQ":"D\u00favidas T\u00e9cnicas",
   "ADM_AREA":"\u00c1rea Administrativa",
   "HEADER_HELP_SUPPORT":"Ajuda e Suporte",
   "HEADER_LOGO":"\/\/d6iofrior8zek.cloudfront.net\/img\/wmportal\/webmeeting-black.png",
   "FOOTER_TRADEMARK":"WebMeeting&reg; e WebMeeting Visit s\u00e3o marcas registradas e exclusivas da Atitude.",
   "FOOTER_LINKS_LABEL_1":"Condi\u00e7\u00f5es de Uso",
   "FOOTER_LINKS_LABEL_2":"Pol\u00edtica de privacidade",
   "FOOTER_LINKS_LABEL_3":"Informa\u00e7\u00f5es de copyright",
   "APPS_TITLE":"Baixe Agora",
   "APPS_DESCRIPTION":"O WebMeeting&reg; Visit funciona em computadores (PC e MAC) e, tamb\u00e9m, smartphones e tablets.",
   "AUTH_DESCRIPTION":"Para acesso \u00e0 visita, insira as informa\u00e7\u00f5es abaixo:",
   "AUTH_ERROR_CODE":"<strong>C\u00f3digo de vista est\u00e1 errado<\/strong>.<br \/>Verifique e tente novamente.",
   "AUTH_ERROR_EMAIL":"Este e-mail <strong>n\u00e3o est\u00e1 autorizado<\/strong> a participar desta visita. Verifique e tente novamente.",
   "AUTH_START":"Iniciar Visita",
   "AUTH_EXIT":"Sair",
   "AUTH_PLACEHOLDER_CODE":"C\u00d3DIGO DA VISITA",
   "AUTH_PLACEHOLDER_EMAIL":"SEU E-MAIL",
   "AWARD_DESCRIPTION":"Vencedor de pr\u00eamio internacional, o WebMeeting\u00ae Visit \u00e9 a nova e exclusiva plataforma, em voc\u00ea participa de visitas on-line com o representante da empresa com a qual est\u00e1 fazendo contato, com v\u00eddeo, \u00e1udio e slides em alta qualidade e seguran\u00e7a.",
   "BANNER_TITLE":"VISITAS ON-LINE, PARA <strong>ENCURTAR DIST\u00c2NCIAS<\/strong><br \/>ENTRE A EMPRESA E SEUS CLIENTES",
   "BANNER_START":"Iniciar Visita",
   "BANNER_COMPATIBILITY":"Compatibilidade",
   "CEO_MSG":"\"As diferentes modalidades de visitas \u00e0 dist\u00e2ncia, at\u00e9 aqui, fizeram parte apenas de projetos-piloto dentro das empresas. Com o WebMeeting\u00ae Visit, esta realidade muda. Ela \u00e9 a ferramenta que leva estas iniciativas a um novo patamar, porque os participantes realmente se veem e se falam, encurtam dist\u00e2ncias e fazem contatos com um n\u00edvel de efici\u00eancia e de relacionamento similar ao de uma visita tradicional.\"",
   "CEO_POSITION":"CEO da Atitude",
   "CONTACT_TITLE":"QUER USAR O WEBMEETING VISIT EM SUA EMPRESA?",
   "CONTACT_DESCRIPTION":"Preencha o formul\u00e1rio e entraremos em contato!",
   "CONTACT_PLACEHOLDER_COMPANY":"EMPRESA",
   "CONTACT_PLACEHOLDER_NAME":"NOME",
   "CONTACT_PLACEHOLDER_EMAIL":"E-MAIL",
   "CONTACT_PLACEHOLDER_PHONE":"TELEFONE",
   "CONTACT_SEND":"Enviar",
   "CONTACT_SEND_DATA":"Enviar dados",
   "CONTACT_ALERT":"Voc\u00ea tamb\u00e9m pode enviar um e-mail para <a href=\"mailto:atendimento@wmvisit.com\">info@atitude.com.br<\/a> ou ligue em (11) 5643-6464.",
   "FEATURES_INTERACTIVITY_TITLE":"Interatividade",
   "FEATURES_INTERACTIVITY_DESCRIPTION":"O visitante e o visitado, poder\u00e3o interagir ao vivo, atrav\u00e9s de \u00e1udio e v\u00eddeo.",
   "FEATURES_SLIDES_TITLE":"Slides e download",
   "FEATURES_SLIDES_DESCRIPTION":"O visitado, atrav\u00e9s dos slides, acompanha com maior compreens\u00e3o o tema exposto e faz download de materiais de seu interesse.",
   "FEATURES_COMPATIBILITY_TITLE":"Compatibilidade",
   "FEATURES_COMPATIBILITY_DESCRIPTION":"Sistema 100% compat\u00edvel com PCs e Macs, Smartphones e Tablets tanto para o visitante quanto para o visitado.",
   "MOBILE_LANGUAGES":"Idiomas",
   "FOOTER_HOME":"HOME",
   "FOOTER_TOP":"TOPO",
   "FOOTER_COMPANY_ITEM_1":"D\u00favidas T\u00e9cnicas",
   "FOOTER_COMPANY_ITEM_2":"Verifique sua compatibilidade",
   "FOOTER_COMPANY_ITEM_3":"Conhe\u00e7a o WebMeeting Visit",
   "FOOTER_COMPANY_ITEM_4":"Condi\u00e7\u00f5es de Uso",
   "FOOTER_COMPANY_ITEM_5":"Pol\u00edtica de Privacidade",
   "FOOTER_COMPANY_ITEM_6":"Informa\u00e7\u00f5es de Copyright"
}
        ';

        $dados = json_decode($json);

        return response()->json($dados);
    }

    public function getHeader()
    {
        $json = '
            {  
   "languages":{  
      "items":[  
         {  
            "label":"PT",
            "key":"pt_BR"
         },
         {  
            "label":"EN",
            "key":"en_US"
         }
      ]
   },
   "help":{  
      "txtMenu":"HEADER_HELP_SUPPORT",
      "items":[  
         {  
            "href":"\/support#\/faq",
            "label":"FAQ"
         },
         {  
            "href":"\/support#\/check-compatibility",
            "label":"CHECK_COMPATIBILITY"
         }
      ]
   }
}
        ';

        $dados = json_decode($json);

        return response()->json($dados);
    }

    public function getMenuMobile()
    {
        $json = '
            {  
   "languages":{  
      "items":[  
         {  
            "label":"PT",
            "key":"pt_BR"
         },
         {  
            "label":"EN",
            "key":"en_US"
         }
      ]
   },
   "support":{  
      "items":[  
         {  
            "label":"FAQ",
            "href":"\/support#\/frequently-asked"
         },
         {  
            "label":"PERFORM_TEST",
            "href":"\/support#\/frequently-asked"
         },
         {  
            "label":"WHAT_IS",
            "href":"javascript:void;"
         }
      ]
   }
}
        ';

        $dados = json_decode($json);

        return response()->json($dados);
    }
}
