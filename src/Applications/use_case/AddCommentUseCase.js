const NewComment = require('../../Domains/comments/entities/NewComment');

class AddCommentUseCase {
  constructor({ commentRepository, threadRepository }) {
    this._commentRepository = commentRepository;
    this._threadRepository = threadRepository;
  }

  async execute(useCasePayload) {
    /**
     * @TODO 7
     * Tuliskan kode alur logika dalam menambahkan komentar baru yang diambil dari `useCasePayload`
     * ke dalam database.
     *
     * Catatan:
     * - Manfaatkanlah entities `NewComment` untuk memastikan nilai `useCasePayload` valid.
     * - Gunakan `this._threadRepository` dan method abstract di dalamnya
     *   untuk berinteraksi dengan database.
     * - Jika thread tidak ditemukan (dilihat dari `threadId`),
     *   bangkitkan error dengan pesan 'ADD_COMMENT_USE_CASE.THREAD_NOT_FOUND'
     * - Kembalikan method `execute` dengan nilai yang dihasilkan dari pemanggilan
     *   fungsi `this._commentRepository.addComment(newComment);`
     */
    const newComment = new NewComment({
      content: useCasePayload.content,
      threadId: useCasePayload.threadId,
      owner: useCasePayload.owner,
    });
    // this._checkThreadId(useCasePayload.threadId);
    const thread = await this._threadRepository.isThreadExist(useCasePayload.threadId);
    if (thread) {
      return this._commentRepository.addComment(newComment);
    }
    throw new Error('ADD_COMMENT_USE_CASE.THREAD_NOT_FOUND');
  }

  async _checkThreadId(threadId) {
    const isThread = await this._threadRepository.isThreadExist(threadId);
    if (isThread) {
      throw new Error('ADD_COMMENT_USE_CASE.THREAD_NOT_FOUND');
    }
  }
}

module.exports = AddCommentUseCase;
