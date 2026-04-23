export const game_description_block_state = (id, btn) => {
    const block = document.querySelector(`.description-block-${id}`);
    if (!block) return;

    const isHidden = block.classList.contains('d-none');

    block.classList.toggle('d-none', !isHidden);
    block.classList.toggle('d-block', isHidden);

    btn.innerText = isHidden ? 'Hide' : 'More';
};