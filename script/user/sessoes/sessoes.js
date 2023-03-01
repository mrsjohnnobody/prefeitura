$(document).ready(function() {
    pagination()
});

function pagination(){
    $('#pagination').twbsPagination({
        totalPages: parseInt($("#totalPage").val()),
        visiblePages: 4,
        onPageClick: function (event, page) {
            event.preventDefault();
            
            var formData = { 'page': page };

            $.ajax({
                type: 'GET',
                url: "/user/sessoesList",
                data: formData,
                headers: { 'page-header': page },
                error: function (error) {
                    loadPageAnimation(false)
                    loadToastNotification("Não foi possível carregar a lista de sessões, tente novamente mais tarde", "danger")
                },
                success: function (result) { 
                    if(result.status === 'success') {
                        $('.sessaoItem').remove()

                        result.sessoes.forEach(sessao => {
                            $("#sessoesItems").append(`
                            <tr id="sessaoIdItem_${sessao.id}" class="sessaoItem">
                                <td>
                                    ${sessao.Numero}
                                </td>
                                <td scope="row">
                                    ${sessao.Tipo}
                                </td>
                                <td>
                                    ${sessao.Data != "0000-00-00" ? new Date(sessao.Data).toLocaleDateString('pt-BR', { timeZone: 'UTC' }) : ""}
                                </td>
                                <td>
                                    ${sessao.Descricao}
                                </td>
                                <td class="d-flex justify-content-center">
                                    ${sessao.Situacao}
                                </td>
                                <td scope="row">
                                    <a href="/user/sessao/${sessao.id}" style="text-decoration: none;">
                                        <img title="Ver Sessão" src="/icons/eye-fill.svg" alt="Ver Sessão" height="20rem">
                                    </a>
                                </td>
                            </tr>
                            `);
                        });

                        $(window).scrollTop(0);
                    }else{
                        loadToastNotification(result.message, "danger")
                    }

                    loadPageAnimation(false)                    
                }
            });
        }
    });
}